import { redirect } from "next/navigation"
import { GiftMark } from "@/components/brand/GiftMark"
import { BackLink } from "@/components/brand/BackLink"
import { NewProfileForm } from "@/components/auth/NewProfileForm"
import { getSessionProfileId } from "@/libs/session"

export const metadata = { title: "Crear perfil · Bota de Navidad" }

export default async function NewProfilePage() {
  const sessionId = await getSessionProfileId()
  if (sessionId) redirect("/")

  return (
    <main className="screen screen-pad-bottom min-h-dvh">
      <BackLink href="/login" className="mt-1">
        Volver
      </BackLink>

      <div className="mt-4 text-center">
        <GiftMark className="mx-auto h-20 w-20" />
        <h1 className="mt-4 text-balance text-[1.7rem] font-semibold leading-tight text-pine">
          Crea tu perfil
        </h1>
        <p className="mx-auto mt-1.5 max-w-[30ch] text-pretty text-[0.9rem] leading-snug text-muted-foreground">
          Lo que pongas aquí le da ideas a quien te regale.
        </p>
      </div>

      <NewProfileForm />
    </main>
  )
}
