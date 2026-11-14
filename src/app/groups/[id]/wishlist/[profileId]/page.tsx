import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ExternalLink, Gift, Pencil, Plus } from "lucide-react"
import { getProfile, getWishlist } from "@/app/api/actions"
import { getGroupView } from "@/app/api/group-actions"
import { BackLink } from "@/components/brand/BackLink"
import { Dock } from "@/components/brand/Dock"
import { PineHeader } from "@/components/brand/PineHeader"
import { TopBar } from "@/components/brand/TopBar"
import { UserAvatar } from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { DeleteItemButton } from "@/components/wishlist/DeleteItemButton"
import { getSessionProfile } from "@/libs/session"
import { formatMXNPrice } from "@/libs/utils"

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ id: string; profileId: string }>
}) {
  const { id, profileId } = await params
  const groupId = Number(id)
  const ownerId = Number(profileId)
  if (!Number.isInteger(groupId) || !Number.isInteger(ownerId)) notFound()

  const me = await getSessionProfile()
  if (!me) redirect("/login")

  const group = await getGroupView(groupId)
  if (!group) notFound()
  if (!group.members.some((member) => member.profileId === me.id)) redirect("/")

  const member = group.members.find((entry) => entry.profileId === ownerId)
  if (!member) notFound()

  const [profile, items] = await Promise.all([
    getProfile(ownerId),
    getWishlist(groupId, ownerId),
  ])
  if (!profile) notFound()

  const isMe = me.id === ownerId

  return (
    <div className="min-h-dvh">
      <TopBar profile={me} hint={group.name} />

      <main className="screen screen-pad-bottom">
        <BackLink href={`/groups/${groupId}`} className="mt-4">
          {group.name}
        </BackLink>

        <div className="mt-3">
          <PineHeader
            title={isMe ? "Mi WishList" : `WishList de ${profile.name}`}
            subtitle={
              isMe
                ? "Agrega tus deseos navideños"
                : "Lo que le gustaría recibir esta Navidad"
            }
          />
        </div>

        <div className="mt-7 flex flex-col items-center text-center">
          <UserAvatar name={profile.name} fotoPerfil={profile.fotoPerfil} size="lg" />
          <h2 className="mt-3 text-[1.35rem] font-semibold leading-tight text-ink">
            {profile.name}
            {isMe ? (
              <span className="text-muted-foreground"> (Tú)</span>
            ) : null}
          </h2>

          {isMe &&
          !(
            profile.colorFavorito &&
            profile.comidaFavorita &&
            profile.tallaPlayera
          ) ? (
            <Link
              href={`/profile/${profile.id}/edit`}
              className="mt-2 text-[0.78rem] font-semibold text-pine underline decoration-pine/30 underline-offset-[3px] hover:decoration-pine"
            >
              Completar mis datos para regalos
            </Link>
          ) : null}
        </div>

        {(profile.colorFavorito || profile.comidaFavorita) && (
          <dl className="mt-6 space-y-3.5">
            <InfoRow label="Color favorito" value={profile.colorFavorito} />
            <InfoRow label="Comida favorita" value={profile.comidaFavorita} />
          </dl>
        )}

        {(profile.tallaPlayera || profile.tallaPantalon || profile.tallaTenis) && (
          <div className="mt-3 flex flex-wrap gap-2">
            <SizeChip label="Playera" value={profile.tallaPlayera} />
            <SizeChip label="Pantalón" value={profile.tallaPantalon} />
            <SizeChip label="Tenis" value={profile.tallaTenis} />
          </div>
        )}

        {profile.pasatiempos ? (
          <p className="mt-4 rounded-xl bg-card/70 px-4 py-3 text-[0.84rem] leading-relaxed text-ink/80">
            <span className="font-semibold text-pine">Le gusta: </span>
            {profile.pasatiempos}
          </p>
        ) : null}

        <div className="mt-7 flex items-baseline justify-between gap-3">
          <h3 className="text-[1.08rem] font-semibold text-pine">
            {isMe ? "Tus regalos" : "Sus regalos"}
            <span className="ml-1.5 font-medium text-pine/50">{items.length}</span>
          </h3>
          {isMe && items.length > 0 ? (
            <Link
              href={`/groups/${groupId}/wishlist/${ownerId}/new`}
              className="text-[0.78rem] font-semibold text-pine underline decoration-pine/30 underline-offset-[3px] hover:decoration-pine"
            >
              Añadir otro
            </Link>
          ) : null}
        </div>

        {items.length === 0 ? (
          <div className="card mt-3.5 flex flex-col items-center px-6 py-9 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pine/8 text-pine/60">
              <Gift className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="mt-3.5 text-[1rem] font-semibold text-ink">
              {isMe ? "Tu lista está vacía" : "Todavía no hay regalos"}
            </p>
            <p className="mt-1 max-w-[28ch] text-[0.84rem] leading-snug text-muted-foreground">
              {isMe
                ? "Pega el enlace de algo que te gustaría y nosotros sacamos la foto."
                : "Cuando agregue sus regalos, los verás aquí."}
            </p>
          </div>
        ) : (
          <ul className="stagger mt-3.5 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="card flex gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <h4 className="text-[1rem] font-semibold leading-tight text-ink">
                    {item.name}
                  </h4>

                  {item.description ? (
                    <p className="mt-1 line-clamp-2 text-[0.84rem] leading-snug text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}

                  {item.price ? (
                    <p className="tnum mt-1.5 text-[0.84rem] font-semibold text-pine">
                      {formatMXNPrice(item.price)}
                    </p>
                  ) : null}

                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {item.category ? (
                      <span className="rounded-full bg-pine/10 px-2 py-0.5 text-[0.68rem] font-semibold text-pine">
                        {item.category}
                      </span>
                    ) : null}
                    {item.priority ? (
                      <span
                        className={
                          item.priority === "Alta"
                            ? "rounded-full bg-bota/10 px-2 py-0.5 text-[0.68rem] font-semibold text-bota-deep"
                            : item.priority === "Media"
                              ? "rounded-full bg-gold/25 px-2 py-0.5 text-[0.68rem] font-semibold text-[#6b4e05]"
                              : "rounded-full bg-sage/30 px-2 py-0.5 text-[0.68rem] font-semibold text-pine"
                        }
                      >
                        {item.priority}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {isMe ? (
                      <>
                        <Button asChild variant="secondary" size="icon-sm">
                          <Link
                            href={`/groups/${groupId}/wishlist/${ownerId}/new?item=${item.id}`}
                            aria-label={`Editar ${item.name}`}
                          >
                            <Pencil className="h-4 w-4" strokeWidth={1.9} />
                          </Link>
                        </Button>
                        <DeleteItemButton id={item.id} />
                      </>
                    ) : null}

                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir ${item.name} en una pestaña nueva`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[0.78rem] font-semibold text-pine transition-colors hover:bg-pine/10"
                      >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                        Ver
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-[#d9d9d9]">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-white/70">
                      <Gift className="h-8 w-8" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {isMe ? (
        <Dock>
          <Button asChild size="lg" className="w-full">
            <Link href={`/groups/${groupId}/wishlist/${ownerId}/new`}>
              <Plus className="h-4 w-4" strokeWidth={2.6} />
              Agregar regalo
            </Link>
          </Button>
        </Dock>
      ) : null}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[0.9rem] font-medium text-ink/85">{label}</dt>
      <dd
        className={
          value
            ? "text-right text-[0.9rem] font-semibold text-pine"
            : "select-none text-right text-[0.9rem] tracking-[0.12em] text-sand"
        }
      >
        {value || "(********)"}
      </dd>
    </div>
  )
}

function SizeChip({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[0.78rem] font-medium text-pine shadow-[0_1px_2px_rgba(17,58,46,0.06)]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </span>
  )
}
