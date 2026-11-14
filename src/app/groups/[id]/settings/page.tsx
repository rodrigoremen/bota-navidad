import { notFound, redirect } from "next/navigation"
import { getGroupView } from "@/app/api/group-actions"
import { BackLink } from "@/components/brand/BackLink"
import { GroupDangerZone } from "@/components/groups/GroupDangerZone"
import { GroupSettingsForm } from "@/components/groups/GroupSettingsForm"
import { getSessionProfile } from "@/libs/session"

export default async function GroupSettingsPage({
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
  if (!group.members.some((member) => member.profileId === me.id)) redirect("/")

  const isOwner = group.ownerId === me.id

  if (!isOwner) {
    return (
      <main className="screen screen-pad-bottom min-h-dvh">
        <BackLink href={`/groups/${groupId}`} className="mt-1">
          {group.name}
        </BackLink>

        <header className="mt-5">
          <h1 className="text-[1.6rem] font-semibold leading-tight text-pine">
            Opciones del grupo
          </h1>
          <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">
            Solo quien creó “{group.name}” puede cambiar la fecha, el presupuesto,
            el nombre y los participantes.
          </p>
        </header>

        <div className="mt-6">
          <GroupDangerZone groupId={groupId} isOwner={false} groupName={group.name} />
        </div>
      </main>
    )
  }

  return (
    <GroupSettingsForm
      mode="edit"
      groupName={group.name}
      initial={{
        id: group.id,
        name: group.name,
        exchangeDate: group.exchangeDate
          ? new Date(group.exchangeDate).toISOString().slice(0, 10)
          : null,
        budget: group.budget,
        allowComments: group.allowComments,
      }}
      footer={<GroupDangerZone groupId={groupId} isOwner groupName={group.name} />}
    />
  )
}
