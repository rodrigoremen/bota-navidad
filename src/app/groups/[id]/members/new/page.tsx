import { notFound, redirect } from "next/navigation"
import { getGroupView, getProfilesNotInGroup } from "@/app/api/group-actions"
import { AddMemberPanel } from "@/components/groups/AddMemberPanel"
import { getSessionProfile } from "@/libs/session"

export default async function AddMemberPage({
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
  if (group.ownerId !== me.id) redirect(`/groups/${groupId}`)

  const candidates = await getProfilesNotInGroup(groupId)

  return (
    <AddMemberPanel groupId={groupId} groupName={group.name} candidates={candidates} />
  )
}
