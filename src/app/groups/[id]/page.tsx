import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ChevronRight, Settings2, Users } from "lucide-react"
import { getGroupView } from "@/app/api/group-actions"
import { BackLink } from "@/components/brand/BackLink"
import { CopyCode } from "@/components/brand/CopyCode"
import { Dock } from "@/components/brand/Dock"
import { PineHeader } from "@/components/brand/PineHeader"
import { TopBar } from "@/components/brand/TopBar"
import { UserAvatar } from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { getSessionProfile } from "@/libs/session"
import { formatExchangeDate, formatMXNPrice } from "@/libs/utils"

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const groupId = Number(id)
  if (!Number.isInteger(groupId)) notFound()

  const me = await getSessionProfile()
  if (!me) redirect("/login")

  const group = await getGroupView(groupId)
  if (!group) notFound()

  const isMember = group.members.some((member) => member.profileId === me.id)
  if (!isMember) redirect("/")

  const isOwner = group.ownerId === me.id
  const date = formatExchangeDate(group.exchangeDate)
  const budget = group.budget ? formatMXNPrice(group.budget) : null
  const subtitle =
    [date, budget].filter(Boolean).join(" · ") ||
    "Comparte tus deseos navideños con familia y amigos"

  return (
    <div className="min-h-dvh">
      <TopBar profile={me} hint="Intercambio" />

      <main className="screen screen-pad-bottom">
        <BackLink href="/" className="mt-4">
          Tus intercambios
        </BackLink>

        <div className="mt-3">
          <PineHeader title={group.name} subtitle={subtitle}>
            <div className="flex flex-col items-center gap-2.5">
              <CopyCode code={group.code} />
              <p className="text-[0.78rem] leading-snug text-cream/65">
                Comparte este código para que se sumen
              </p>
            </div>
          </PineHeader>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-1.5 text-[1.08rem] font-semibold text-pine">
            <Users className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Participantes
            <span className="font-medium text-pine">({group.members.length})</span>
          </h2>

          {isOwner ? (
            <Button asChild variant="secondary" size="sm">
              <Link href={`/groups/${group.id}/members/new`}>Añadir</Link>
            </Button>
          ) : null}
        </div>

        <ul className="stagger mt-3.5 space-y-2.5">
          {group.members.map((member) => {
            const isMe = member.profileId === me.id
            return (
              <li key={member.profileId}>
                <Link
                  href={`/groups/${group.id}/wishlist/${member.profileId}`}
                  className="card flex items-center gap-3 p-3.5 pl-4 transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-mint"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[1rem] font-semibold leading-tight text-ink">
                        {member.name}
                      </span>
                      {isMe ? (
                        <span className="rounded-full bg-pine/10 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-pine">
                          Tú
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] text-muted-foreground">
                      {member.profileId === group.ownerId ? (
                        <span className="rounded-full bg-gold/25 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#6b4e05]">
                          Organiza
                        </span>
                      ) : null}
                      <span>
                        {member.itemCount === 0
                          ? "Todavía sin regalos"
                          : `${member.itemCount} ${member.itemCount === 1 ? "regalo" : "regalos"} en su lista`}
                      </span>
                    </span>
                  </span>

                  <UserAvatar name={member.name} fotoPerfil={member.fotoPerfil} size="md" />
                  <ChevronRight className="h-4 w-4 shrink-0 text-pine/35" strokeWidth={2.2} />
                </Link>
              </li>
            )
          })}
        </ul>

        <Link
          href={`/groups/${group.id}/settings`}
          className="mt-7 inline-flex items-center gap-2 rounded-full py-1 pr-3 text-[0.84rem] font-medium text-pine transition-colors hover:bg-pine/10 hover:text-pine-deep"
        >
          <Settings2 className="h-4 w-4" strokeWidth={1.9} />
          {isOwner ? "Ajustes del intercambio" : "Opciones del grupo"}
        </Link>
      </main>

      <Dock>
        <Button asChild size="lg" className="w-full">
          <Link href={`/groups/${group.id}/wishlist/${me.id}`}>
            Mi wishlist
            <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </Button>
      </Dock>
    </div>
  )
}
