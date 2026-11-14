import { redirect } from "next/navigation"
import { GroupSettingsForm } from "@/components/groups/GroupSettingsForm"
import { getSessionProfile } from "@/libs/session"

export const metadata = { title: "Configuración · Bota de Navidad" }

export default async function NewGroupSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>
}) {
  const profile = await getSessionProfile()
  if (!profile) redirect("/login")

  const { name } = await searchParams
  const groupName = (name ?? "").trim()
  if (groupName.length < 2) redirect("/groups/new")

  return (
    <GroupSettingsForm
      mode="create"
      groupName={groupName}
      defaultOwnerName={profile.name}
    />
  )
}
