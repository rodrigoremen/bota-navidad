import Link from "next/link"
import { ChevronRight, Gift, LogOut, Plus, Users } from "lucide-react"
import { logout } from "@/app/api/auth-actions"
import { getMyGroups } from "@/app/api/group-actions"
import { GiftMark } from "@/components/brand/GiftMark"
import { VillageScene } from "@/components/brand/VillageScene"
import { TopBar } from "@/components/brand/TopBar"
import { UserAvatar } from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { getSessionProfile } from "@/libs/session"
import { formatExchangeDate } from "@/libs/utils"
import { redirect } from "next/navigation"

type SessionProfile = { id: number; name: string; fotoPerfil: string | null }

export default async function Home() {
  const profile = await getSessionProfile()
  if (!profile) redirect("/login")

  const groups = await getMyGroups(profile.id)

  if (groups.length === 0) {
    return <EmptyHome profile={profile} />
  }

  return (
    <div className="min-h-dvh">
      <TopBar profile={profile} hint="Tus intercambios" />

      <main className="screen screen-pad-bottom">
        <header className="mt-6">
          <h1 className="text-balance text-[1.6rem] font-semibold leading-tight tracking-[-0.01em] text-pine">
            Tus intercambios
          </h1>
          <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">
            Elige uno para ver a los participantes y tu lista.
          </p>
        </header>

        <ul className="stagger mt-5 space-y-3">
          {groups.map((group) => {
            const date = formatExchangeDate(group.exchangeDate)
            return (
              <li key={group.id}>
                <Link
                  href={`/groups/${group.id}`}
                  className="card flex items-center gap-3.5 p-4 pr-2.5 transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-mint"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pine/10 text-pine">
                    <Gift className="h-5 w-5" strokeWidth={1.8} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[1rem] font-semibold leading-tight text-ink">
                      {group.name}
                    </span>
                    <span className="mt-1 block text-[0.78rem] leading-snug text-muted-foreground">
                      {date ?? "Sin fecha"}
                    </span>
                    <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted-foreground">
                      {group.memberCount}{" "}
                      {group.memberCount === 1 ? "participante" : "participantes"}
                    </span>
                    <span className="mt-1 block text-[0.68rem] font-medium text-pine">
                      {group.itemCount === 0
                        ? "Tu lista está vacía"
                        : `${group.itemCount} ${group.itemCount === 1 ? "regalo" : "regalos"} en tu lista`}
                    </span>
                  </span>

                  <ChevronRight className="h-5 w-5 shrink-0 text-pine/45" strokeWidth={2} />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button asChild variant="secondary" className="w-full">
            <Link href="/groups/new">
              <Plus className="h-4 w-4" strokeWidth={2.2} />
              Nuevo grupo
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/groups/join">
              <Users className="h-4 w-4" strokeWidth={2} />
              Unirme
            </Link>
          </Button>
        </div>

        <p className="mt-5 text-center text-[0.78rem] leading-snug text-muted-foreground">
          Para unirte a un intercambio necesitas el código que te compartieron.
        </p>
      </main>
    </div>
  )
}

function EmptyHome({ profile }: { profile: SessionProfile }) {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-pine text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_65%_at_18%_0%,#2F7460_0%,transparent_56%),linear-gradient(168deg,#266b57_0%,#1F5C4A_46%,#1D5747_100%)]"
      />

      <div className="relative z-10 flex items-center justify-between px-5 pt-5">
        <Link
          href={`/profile/${profile.id}/edit`}
          className="flex items-center gap-2.5 rounded-full pr-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-pine"
          aria-label="Editar mi perfil"
        >
          <UserAvatar name={profile.name} fotoPerfil={profile.fotoPerfil} size="sm" />
          <span className="text-[0.84rem] font-medium text-cream/85">{profile.name}</span>
        </Link>

        <form action={logout}>
          <button
            type="submit"
            aria-label="Cerrar sesión"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream/75 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <LogOut className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} />
          </button>
        </form>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-7 text-center">
        <GiftMark className="h-28 w-28 drop-shadow-[0_14px_26px_rgba(0,0,0,0.28)]" />

        <h1 className="mt-8 max-w-[19ch] text-balance text-[1.85rem] font-semibold leading-[1.15] tracking-[-0.015em]">
          Aún no estás participando en ningún grupo
        </h1>

        <div className="mt-9 w-full space-y-2.5 rounded-[26px] border border-cream/15 bg-cream/[0.07] p-4">
          <Button asChild variant="on-dark" size="lg" className="w-full">
            <Link href="/groups/new">
              <Plus className="h-4 w-4" strokeWidth={2.4} />
              Nuevo grupo
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full">
            <Link href="/groups/join">
              <Users className="h-4 w-4" strokeWidth={2.1} />
              Unirse a un grupo
            </Link>
          </Button>
        </div>
      </div>

      <VillageScene className="-mb-px h-48 text-pine-deep" />
    </main>
  )
}
