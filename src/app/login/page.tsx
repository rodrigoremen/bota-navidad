import { redirect } from "next/navigation"
import { GiftMark } from "@/components/brand/GiftMark"
import { VillageScene } from "@/components/brand/VillageScene"
import { LoginForm } from "@/components/auth/LoginForm"
import { getSessionProfileId } from "@/libs/session"

export const metadata = { title: "Entrar · Bota de Navidad" }

export default async function LoginPage() {
  const sessionId = await getSessionProfileId()
  if (sessionId) redirect("/")

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-pine text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_18%_0%,#2F7460_0%,transparent_58%),linear-gradient(165deg,#256a56_0%,#1F5C4A_50%,#1D5747_100%)]"
      />

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-2 pt-14">
        <GiftMark className="mx-auto h-24 w-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]" />

        <h1 className="mt-6 text-balance text-center text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em]">
          Bota de Navidad
        </h1>
        <p className="mx-auto mt-2 max-w-[24ch] text-pretty text-center text-[0.9rem] leading-snug text-cream/75">
          Tu intercambio y tu lista de deseos, en un solo lugar.
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>

      <VillageScene className="-mb-px h-40 text-pine-deep" />
    </main>
  )
}
