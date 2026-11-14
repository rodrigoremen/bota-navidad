import { cookies } from "next/headers"
import prisma from "@/libs/prisma"

export const SESSION_COOKIE = "bota_session"
const MAX_AGE = 60 * 60 * 24 * 60 // 60 días

export async function getSessionProfileId(): Promise<number | null> {
  const store = await cookies()
  const raw = store.get(SESSION_COOKIE)?.value
  if (!raw) return null
  const id = Number(raw)
  return Number.isInteger(id) && id > 0 ? id : null
}

export async function getSessionProfile() {
  const id = await getSessionProfileId()
  if (!id) return null
  try {
    return await prisma.profile.findUnique({
      where: { id },
      select: { id: true, name: true, fotoPerfil: true },
    })
  } catch (error) {
    console.error("No se pudo leer la sesión:", error)
    return null
  }
}

/** Solo puede llamarse desde Server Actions o Route Handlers. */
export async function setSessionProfile(id: number) {
  const store = await cookies()
  store.set(SESSION_COOKIE, String(id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  })
}

/** Solo puede llamarse desde Server Actions o Route Handlers. */
export async function clearSession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}
