import { notFound, redirect } from "next/navigation"
import { getProfile } from "@/app/api/actions"
import { ProfileEditForm } from "@/components/auth/ProfileEditForm"
import { getSessionProfileId } from "@/libs/session"

export const metadata = { title: "Tu perfil · Bota de Navidad" }

export default async function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const profileId = Number(id)
  if (!Number.isInteger(profileId)) notFound()

  const sessionId = await getSessionProfileId()
  if (!sessionId) redirect("/login")
  if (sessionId !== profileId) redirect(`/profile/${sessionId}/edit`)

  const profile = await getProfile(profileId)
  if (!profile) notFound()

  return <ProfileEditForm profile={profile} />
}
