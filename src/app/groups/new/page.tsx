import { redirect } from "next/navigation"
import { NewGroupNameForm } from "@/components/groups/NewGroupNameForm"
import { getSessionProfileId } from "@/libs/session"

export const metadata = { title: "Nuevo grupo · Bota de Navidad" }

export default async function NewGroupPage() {
  const sessionId = await getSessionProfileId()
  if (!sessionId) redirect("/login")

  return <NewGroupNameForm />
}
