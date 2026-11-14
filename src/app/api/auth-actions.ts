"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "@/libs/prisma"
import {
  clearSession,
  getSessionProfileId,
  setSessionProfile,
} from "@/libs/session"

type Result = { ok: true; id?: number } | { ok: false; error: string }

export async function login(name: string, password: string): Promise<Result> {
  const cleanName = name.trim()
  if (!cleanName || !password) {
    return { ok: false, error: "Escribe tu nombre y tu contraseña." }
  }

  try {
    const candidates = await prisma.profile.findMany({
      where: { name: { equals: cleanName, mode: "insensitive" } },
      select: { id: true, name: true, password: true },
      take: 5,
    })

    if (candidates.length === 0) {
      return { ok: false, error: "No encontramos ese perfil. Revisa el nombre o crea uno." }
    }

    const match = candidates.find((p) => p.password === password)
    if (!match) {
      return { ok: false, error: "La contraseña no coincide. Inténtalo otra vez." }
    }

    await setSessionProfile(match.id)
    revalidatePath("/", "layout")
    return { ok: true, id: match.id }
  } catch (error) {
    console.error("login:", error)
    return { ok: false, error: "No pudimos entrar. Inténtalo de nuevo." }
  }
}

export async function createAccount(
  name: string,
  password: string,
  fotoPerfil?: string | null
): Promise<Result> {
  const cleanName = name.trim()
  if (cleanName.length < 2) {
    return { ok: false, error: "Pon un nombre de al menos 2 letras." }
  }
  if (password.trim().length < 4) {
    return { ok: false, error: "La contraseña necesita al menos 4 caracteres." }
  }

  try {
    const exists = await prisma.profile.findFirst({
      where: { name: { equals: cleanName, mode: "insensitive" } },
      select: { id: true },
    })
    if (exists) {
      return { ok: false, error: "Ya existe un perfil con ese nombre. Prueba otro." }
    }

    const profile = await prisma.profile.create({
      data: {
        name: cleanName,
        password,
        fotoPerfil: fotoPerfil || null,
      },
      select: { id: true },
    })

    await setSessionProfile(profile.id)
    revalidatePath("/", "layout")
    return { ok: true, id: profile.id }
  } catch (error) {
    console.error("createAccount:", error)
    return { ok: false, error: "No pudimos crear tu perfil. Inténtalo de nuevo." }
  }
}

export async function logout() {
  await clearSession()
  revalidatePath("/", "layout")
  redirect("/login")
}

export async function setActiveProfile(id: number): Promise<Result> {
  const current = await getSessionProfileId()
  if (!current) return { ok: false, error: "Tu sesión expiró." }
  await setSessionProfile(id)
  revalidatePath("/", "layout")
  return { ok: true, id }
}
