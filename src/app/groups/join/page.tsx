import { redirect } from "next/navigation"
import { JoinGroupForm } from "@/components/groups/JoinGroupForm"
import { getSessionProfileId } from "@/libs/session"

export const metadata = { title: "Unirse a un grupo · Bota de Navidad" }

export default async function JoinGroupPage() {
  const sessionId = await getSessionProfileId()
  if (!sessionId) redirect("/login")

  return <JoinGroupForm />
}
