"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/libs/prisma"
import { getSessionProfileId } from "@/libs/session"

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

function randomCode() {
  let out = ""
  for (let i = 0; i < 4; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return `BOTA-${out}`
}

function normalizeCode(value: string) {
  const raw = value.trim().toUpperCase().replace(/\s+/g, "")
  if (!raw) return ""
  return raw.startsWith("BOTA-") ? raw : `BOTA-${raw.replace(/^BOTA/, "")}`
}

async function uniqueCode() {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = randomCode()
    const exists = await prisma.group.findUnique({
      where: { code },
      select: { id: true },
    })
    if (!exists) return code
  }
  return `BOTA-${Date.now().toString(36).toUpperCase().slice(-4)}`
}

/**
 * La única fuente de verdad para "quién manda" es Group.ownerId: el perfil que
 * creó el intercambio. No hay roles de aplicación; el resto son participantes.
 */
async function getOwnership(groupId: number) {
  return prisma.group.findUnique({
    where: { id: groupId },
    select: { ownerId: true },
  })
}

export type MemberView = {
  profileId: number
  name: string
  fotoPerfil: string | null
  itemCount: number
}

export type GroupView = {
  id: number
  name: string
  code: string
  exchangeDate: Date | null
  budget: number | null
  allowComments: boolean
  ownerId: number
  members: MemberView[]
}

export type GroupSummary = {
  id: number
  name: string
  code: string
  exchangeDate: Date | null
  memberCount: number
  itemCount: number
}

export async function getMyGroups(profileId: number): Promise<GroupSummary[]> {
  try {
    const groups = await prisma.group.findMany({
      where: { members: { some: { profileId } } },
      orderBy: [{ exchangeDate: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        code: true,
        exchangeDate: true,
        _count: { select: { members: true } },
      },
    })

    const counts = await prisma.wishlistItem.groupBy({
      by: ["groupId"],
      where: { profileId, groupId: { in: groups.map((g) => g.id) } },
      _count: { _all: true },
    })
    const mine = new Map(counts.map((c) => [c.groupId, c._count._all]))

    return groups.map((g) => ({
      id: g.id,
      name: g.name,
      code: g.code,
      exchangeDate: g.exchangeDate,
      memberCount: g._count.members,
      itemCount: mine.get(g.id) ?? 0,
    }))
  } catch (error) {
    console.error("getMyGroups:", error)
    return []
  }
}

export async function getGroupView(groupId: number): Promise<GroupView | null> {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        name: true,
        code: true,
        exchangeDate: true,
        budget: true,
        allowComments: true,
        ownerId: true,
        members: {
          orderBy: { createdAt: "asc" },
          select: {
            profileId: true,
            profile: {
              select: {
                name: true,
                fotoPerfil: true,
                wishlist: {
                  where: { groupId },
                  select: { id: true },
                },
              },
            },
          },
        },
      },
    })
    if (!group) return null

    const members = group.members.map((m) => ({
      profileId: m.profileId,
      name: m.profile.name,
      fotoPerfil: m.profile.fotoPerfil,
      itemCount: m.profile.wishlist.length,
    }))

    // Quien creó el grupo siempre aparece primero.
    members.sort((a, b) => {
      if (a.profileId === group.ownerId) return -1
      if (b.profileId === group.ownerId) return 1
      return 0
    })

    return {
      id: group.id,
      name: group.name,
      code: group.code,
      exchangeDate: group.exchangeDate,
      budget: group.budget,
      allowComments: group.allowComments,
      ownerId: group.ownerId,
      members,
    }
  } catch (error) {
    console.error("getGroupView:", error)
    return null
  }
}

export async function createGroup(input: {
  name: string
  exchangeDate?: string | null
  budget?: number | null
  allowComments: boolean
  ownerName?: string
}): Promise<{ ok: true; groupId: number } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  const name = input.name.trim()
  if (name.length < 2) {
    return { ok: false, error: "Ponle un nombre de al menos 2 letras a tu grupo." }
  }

  try {
    const code = await uniqueCode()
    const group = await prisma.group.create({
      data: {
        name,
        code,
        exchangeDate: input.exchangeDate ? new Date(input.exchangeDate) : null,
        budget:
          typeof input.budget === "number" && Number.isFinite(input.budget)
            ? input.budget
            : null,
        allowComments: input.allowComments,
        ownerId: me,
        members: { create: { profileId: me, role: "owner" } },
      },
      select: { id: true },
    })

    const ownerName = input.ownerName?.trim()
    if (ownerName && ownerName.length >= 2) {
      await prisma.profile.update({ where: { id: me }, data: { name: ownerName } })
    }

    revalidatePath("/")
    return { ok: true, groupId: group.id }
  } catch (error) {
    console.error("createGroup:", error)
    return { ok: false, error: "No pudimos crear el grupo. Inténtalo de nuevo." }
  }
}

export async function joinGroup(
  code: string
): Promise<{ ok: true; groupId: number } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  const normalized = normalizeCode(code)
  if (normalized.length < 4) {
    return { ok: false, error: "Escribe el código que te compartieron." }
  }

  try {
    const group = await prisma.group.findUnique({
      where: { code: normalized },
      select: { id: true },
    })
    if (!group) {
      return { ok: false, error: "Ese código no existe. Revísalo con quien te invitó." }
    }

    await prisma.groupMember.upsert({
      where: { groupId_profileId: { groupId: group.id, profileId: me } },
      create: { groupId: group.id, profileId: me, role: "member" },
      update: {},
    })

    revalidatePath("/")
    revalidatePath(`/groups/${group.id}`)
    return { ok: true, groupId: group.id }
  } catch (error) {
    console.error("joinGroup:", error)
    return { ok: false, error: "No pudimos unirte al grupo. Inténtalo de nuevo." }
  }
}

export async function updateGroup(
  groupId: number,
  input: {
    name: string
    exchangeDate?: string | null
    budget?: number | null
    allowComments: boolean
  }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  const name = input.name.trim()
  if (name.length < 2) return { ok: false, error: "El nombre del grupo es muy corto." }

  try {
    const group = await getOwnership(groupId)
    if (!group) return { ok: false, error: "Ese grupo ya no existe." }
    if (group.ownerId !== me) {
      return { ok: false, error: "Solo quien creó el grupo puede cambiar los ajustes." }
    }

    await prisma.group.update({
      where: { id: groupId },
      data: {
        name,
        exchangeDate: input.exchangeDate ? new Date(input.exchangeDate) : null,
        budget:
          typeof input.budget === "number" && Number.isFinite(input.budget)
            ? input.budget
            : null,
        allowComments: input.allowComments,
      },
    })

    revalidatePath("/")
    revalidatePath(`/groups/${groupId}`)
    return { ok: true }
  } catch (error) {
    console.error("updateGroup:", error)
    return { ok: false, error: "No pudimos guardar los cambios." }
  }
}

export async function deleteGroup(
  groupId: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  try {
    const group = await getOwnership(groupId)
    if (!group) return { ok: false, error: "Ese grupo ya no existe." }
    if (group.ownerId !== me) {
      return { ok: false, error: "Solo quien creó el grupo puede eliminarlo." }
    }

    await prisma.group.delete({ where: { id: groupId } })
    revalidatePath("/")
    return { ok: true }
  } catch (error) {
    console.error("deleteGroup:", error)
    return { ok: false, error: "No pudimos eliminar el grupo." }
  }
}

export async function leaveGroup(
  groupId: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  try {
    const group = await getOwnership(groupId)
    if (!group) return { ok: false, error: "Ese grupo ya no existe." }
    if (group.ownerId === me) {
      return {
        ok: false,
        error: "Eres quien organiza el grupo. Elimínalo si quieres salir.",
      }
    }

    await prisma.$transaction([
      prisma.wishlistItem.deleteMany({ where: { groupId, profileId: me } }),
      prisma.groupMember.delete({
        where: { groupId_profileId: { groupId, profileId: me } },
      }),
    ])

    revalidatePath("/")
    return { ok: true }
  } catch (error) {
    console.error("leaveGroup:", error)
    return { ok: false, error: "No pudimos sacarte del grupo." }
  }
}

export async function addMember(
  groupId: number,
  profileId: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  try {
    const group = await getOwnership(groupId)
    if (!group) return { ok: false, error: "Ese grupo ya no existe." }
    if (group.ownerId !== me) {
      return { ok: false, error: "Solo quien creó el grupo puede añadir participantes." }
    }

    await prisma.groupMember.upsert({
      where: { groupId_profileId: { groupId, profileId } },
      create: { groupId, profileId, role: "member" },
      update: {},
    })

    revalidatePath(`/groups/${groupId}`)
    return { ok: true }
  } catch (error) {
    console.error("addMember:", error)
    return { ok: false, error: "No pudimos añadir a esa persona." }
  }
}

export async function createMemberAndAdd(
  groupId: number,
  name: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  const cleanName = name.trim()
  if (cleanName.length < 2) return { ok: false, error: "Escribe un nombre válido." }
  if (password.trim().length < 4) {
    return { ok: false, error: "La contraseña necesita al menos 4 caracteres." }
  }

  try {
    const group = await getOwnership(groupId)
    if (!group) return { ok: false, error: "Ese grupo ya no existe." }
    if (group.ownerId !== me) {
      return { ok: false, error: "Solo quien creó el grupo puede añadir participantes." }
    }

    const exists = await prisma.profile.findFirst({
      where: { name: { equals: cleanName, mode: "insensitive" } },
      select: { id: true },
    })
    if (exists) {
      return {
        ok: false,
        error: "Ya existe ese nombre. Búscalo en la lista y añádelo.",
      }
    }

    const profile = await prisma.profile.create({
      data: { name: cleanName, password },
      select: { id: true },
    })
    await prisma.groupMember.create({
      data: { groupId, profileId: profile.id, role: "member" },
    })

    revalidatePath(`/groups/${groupId}`)
    return { ok: true }
  } catch (error) {
    console.error("createMemberAndAdd:", error)
    return { ok: false, error: "No pudimos crear a esa persona." }
  }
}

export async function removeMember(
  groupId: number,
  profileId: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  try {
    const group = await getOwnership(groupId)
    if (!group) return { ok: false, error: "Ese grupo ya no existe." }
    if (group.ownerId !== me) {
      return { ok: false, error: "Solo quien creó el grupo puede sacar a alguien." }
    }
    if (profileId === group.ownerId) {
      return { ok: false, error: "No puedes sacar a quien organiza el grupo." }
    }

    await prisma.$transaction([
      prisma.wishlistItem.deleteMany({ where: { groupId, profileId } }),
      prisma.groupMember.delete({
        where: { groupId_profileId: { groupId, profileId } },
      }),
    ])

    revalidatePath(`/groups/${groupId}`)
    return { ok: true }
  } catch (error) {
    console.error("removeMember:", error)
    return { ok: false, error: "No pudimos sacar a esa persona." }
  }
}

export async function getProfilesNotInGroup(groupId: number) {
  const me = await getSessionProfileId()
  if (!me) return []

  try {
    const group = await getOwnership(groupId)
    if (!group || group.ownerId !== me) return []

    const profiles = await prisma.profile.findMany({
      where: { memberships: { none: { groupId } } },
      orderBy: { name: "asc" },
      select: { id: true, name: true, fotoPerfil: true },
    })
    return profiles
  } catch (error) {
    console.error("getProfilesNotInGroup:", error)
    return []
  }
}
