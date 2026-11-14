"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogOut, Trash2 } from "lucide-react"
import { deleteGroup, leaveGroup } from "@/app/api/group-actions"
import { Button } from "@/components/ui/button"
import { FormMessage } from "@/components/ui/field"

export function GroupDangerZone({
  groupId,
  isOwner,
  groupName,
}: {
  groupId: number
  isOwner: boolean
  groupName: string
}) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function run() {
    setPending(true)
    setError("")
    const result = isOwner ? await deleteGroup(groupId) : await leaveGroup(groupId)

    if (!result.ok) {
      setError(result.error)
      setPending(false)
      return
    }
    router.push("/")
  }

  return (
    <section className="card p-5">
      <h2 className="flex items-center gap-1.5 text-[1rem] font-semibold text-ink">
        {isOwner ? (
          <Trash2 className="h-4 w-4 text-bota" strokeWidth={2} aria-hidden="true" />
        ) : (
          <LogOut className="h-4 w-4 text-pine" strokeWidth={2} aria-hidden="true" />
        )}
        {isOwner ? "Eliminar intercambio" : "Salir del grupo"}
      </h2>
      <p className="mt-1.5 text-[0.84rem] leading-snug text-muted-foreground">
        {isOwner
          ? `“${groupName}” se borra con sus participantes y sus listas. No se puede deshacer.`
          : `Dejarás de ver “${groupName}” y tu lista de este intercambio se borrará.`}
      </p>

      {confirming ? (
        <div className="mt-4 flex items-center gap-2">
          <Button type="button" variant="destructive" size="sm" onClick={run} disabled={pending}>
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {pending ? "Un momento…" : isOwner ? "Sí, eliminar" : "Sí, salir"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setConfirming(false)}
            disabled={pending}
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4 border-bota/35 text-bota-deep hover:border-bota/60 hover:bg-bota/[0.06]"
          onClick={() => setConfirming(true)}
        >
          {isOwner ? "Eliminar el intercambio" : "Salir del grupo"}
        </Button>
      )}

      <div className="mt-3">
        <FormMessage tone="error">{error}</FormMessage>
      </div>
    </section>
  )
}
