import { notFound, redirect } from "next/navigation"
import { getWishlistItem } from "@/app/api/actions"
import { getGroupView } from "@/app/api/group-actions"
import { WishlistItemForm } from "@/components/wishlist/WishlistItemForm"
import { getSessionProfile } from "@/libs/session"

export default async function NewWishlistItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; profileId: string }>
  searchParams: Promise<{ item?: string }>
}) {
  const { id, profileId } = await params
  const groupId = Number(id)
  const ownerId = Number(profileId)
  if (!Number.isInteger(groupId) || !Number.isInteger(ownerId)) notFound()

  const me = await getSessionProfile()
  if (!me) redirect("/login")
  if (me.id !== ownerId) redirect(`/groups/${groupId}/wishlist/${ownerId}`)

  const group = await getGroupView(groupId)
  if (!group) notFound()
  if (!group.members.some((member) => member.profileId === me.id)) redirect("/")

  const { item } = await searchParams
  const itemId = item ? Number(item) : null
  const existing =
    itemId && Number.isInteger(itemId) ? await getWishlistItem(itemId) : null

  if (existing && (existing.profileId !== ownerId || existing.groupId !== groupId)) {
    notFound()
  }

  return (
    <WishlistItemForm
      groupId={groupId}
      profileId={ownerId}
      item={existing}
      groupName={group.name}
    />
  )
}
