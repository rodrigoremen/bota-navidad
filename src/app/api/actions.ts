"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/libs/prisma"
import { getSessionProfileId } from "@/libs/session"

export async function getProfile(id: number) {
  try {
    return await prisma.profile.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        fotoPerfil: true,
        colorFavorito: true,
        tallaPlayera: true,
        tallaPantalon: true,
        tallaTenis: true,
        pasatiempos: true,
        comidaFavorita: true,
        notas: true,
      },
    })
  } catch (error) {
    console.error("getProfile:", error)
    return null
  }
}

export async function updateProfile(
  id: number,
  data: {
    name?: string
    password?: string
    fotoPerfil?: string | null
    colorFavorito?: string | null
    tallaPlayera?: string | null
    tallaPantalon?: string | null
    tallaTenis?: string | null
    pasatiempos?: string | null
    comidaFavorita?: string | null
    notas?: string | null
  }
) {
  const me = await getSessionProfileId()
  if (!me) return { success: false, error: "Tu sesión expiró. Vuelve a entrar." }
  if (me !== id) {
    return { success: false, error: "Solo puedes editar tu propio perfil." }
  }

  const payload = { ...data }
  if (payload.name !== undefined) {
    const name = payload.name.trim()
    if (name.length < 2) {
      return { success: false, error: "El nombre es demasiado corto." }
    }
    payload.name = name
  }
  if (payload.password !== undefined && payload.password.trim().length < 4) {
    return { success: false, error: "La contraseña necesita al menos 4 caracteres." }
  }

  try {
    await prisma.profile.update({ where: { id }, data: payload })
    revalidatePath("/")
    revalidatePath("/profile/[id]/edit", "page")
    return { success: true }
  } catch (error) {
    console.error("updateProfile:", error)
    return { success: false, error: "No pudimos guardar tu perfil." }
  }
}

export async function verifyPassword(id: number, password: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
      select: { password: true },
    })
    return Boolean(profile && profile.password === password)
  } catch (error) {
    console.error("verifyPassword:", error)
    return false
  }
}

export type WishlistView = {
  id: number
  name: string
  url: string
  image: string | null
  description: string | null
  price: number | null
  category: string | null
  priority: string | null
  profileId: number
  groupId: number | null
}

export async function getWishlist(
  groupId: number,
  profileId: number
): Promise<WishlistView[]> {
  try {
    const items = await prisma.wishlistItem.findMany({
      where: { groupId, profileId },
      orderBy: [{ createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        url: true,
        image: true,
        description: true,
        price: true,
        category: true,
        priority: true,
        profileId: true,
        groupId: true,
      },
    })
    return items
  } catch (error) {
    console.error("getWishlist:", error)
    return []
  }
}

export async function getWishlistItem(id: number): Promise<WishlistView | null> {
  try {
    return await prisma.wishlistItem.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        url: true,
        image: true,
        description: true,
        price: true,
        category: true,
        priority: true,
        profileId: true,
        groupId: true,
      },
    })
  } catch (error) {
    console.error("getWishlistItem:", error)
    return null
  }
}

export async function addWishlistItem(input: {
  groupId: number
  profileId: number
  name: string
  url: string
  image?: string | null
  description?: string | null
  price?: number | null
  category?: string | null
  priority?: string | null
}): Promise<{ ok: true; id: number } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }
  if (me !== input.profileId) {
    return { ok: false, error: "Solo puedes añadir regalos a tu propia lista." }
  }

  const name = input.name.trim()
  if (!name) return { ok: false, error: "Escribe el nombre del regalo." }

  try {
    const membership = await prisma.groupMember.findUnique({
      where: {
        groupId_profileId: { groupId: input.groupId, profileId: input.profileId },
      },
      select: { id: true },
    })
    if (!membership) {
      return { ok: false, error: "No participas en este intercambio." }
    }

    const item = await prisma.wishlistItem.create({
      data: {
        name,
        url: input.url?.trim() || "",
        image: input.image || null,
        description: input.description?.trim() || null,
        price:
          typeof input.price === "number" && Number.isFinite(input.price)
            ? input.price
            : null,
        category: input.category || null,
        priority: input.priority || "Media",
        profileId: input.profileId,
        groupId: input.groupId,
      },
      select: { id: true },
    })

    revalidatePath(`/groups/${input.groupId}`)
    revalidatePath(`/groups/${input.groupId}/wishlist/${input.profileId}`)
    return { ok: true, id: item.id }
  } catch (error) {
    console.error("addWishlistItem:", error)
    return { ok: false, error: "No pudimos guardar el regalo." }
  }
}

export async function updateWishlistItem(
  id: number,
  input: {
    name: string
    url: string
    image?: string | null
    description?: string | null
    price?: number | null
    category?: string | null
    priority?: string | null
  }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  const name = input.name.trim()
  if (!name) return { ok: false, error: "Escribe el nombre del regalo." }

  try {
    const item = await prisma.wishlistItem.findUnique({
      where: { id },
      select: { profileId: true, groupId: true },
    })
    if (!item) return { ok: false, error: "Ese regalo ya no existe." }
    if (item.profileId !== me) {
      return { ok: false, error: "Solo puedes editar tus propios regalos." }
    }

    await prisma.wishlistItem.update({
      where: { id },
      data: {
        name,
        url: input.url?.trim() || "",
        image: input.image || null,
        description: input.description?.trim() || null,
        price:
          typeof input.price === "number" && Number.isFinite(input.price)
            ? input.price
            : null,
        category: input.category || null,
        priority: input.priority || "Media",
      },
    })

    if (item.groupId) {
      revalidatePath(`/groups/${item.groupId}`)
      revalidatePath(`/groups/${item.groupId}/wishlist/${item.profileId}`)
    }
    return { ok: true }
  } catch (error) {
    console.error("updateWishlistItem:", error)
    return { ok: false, error: "No pudimos guardar los cambios." }
  }
}

export async function deleteWishlistItem(
  id: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const me = await getSessionProfileId()
  if (!me) return { ok: false, error: "Tu sesión expiró. Vuelve a entrar." }

  try {
    const item = await prisma.wishlistItem.findUnique({
      where: { id },
      select: { profileId: true, groupId: true },
    })
    if (!item) return { ok: false, error: "Ese regalo ya no existe." }
    if (item.profileId !== me) {
      return { ok: false, error: "Solo puedes borrar tus propios regalos." }
    }

    await prisma.wishlistItem.delete({ where: { id } })

    if (item.groupId) {
      revalidatePath(`/groups/${item.groupId}`)
      revalidatePath(`/groups/${item.groupId}/wishlist/${item.profileId}`)
    }
    return { ok: true }
  } catch (error) {
    console.error("deleteWishlistItem:", error)
    return { ok: false, error: "No pudimos borrar el regalo." }
  }
}

export async function getProfiles() {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, fotoPerfil: true },
    })
    return profiles
  } catch (error) {
    console.error("getProfiles:", error)
    return []
  }
}
