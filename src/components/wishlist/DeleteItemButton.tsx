"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"
import { deleteWishlistItem } from "@/app/api/actions"

export function DeleteItemButton({ id }: { id: number }) {
  const [confirming, setConfirming] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function remove() {
    setPending(true)
    setError("")
    const result = await deleteWishlistItem(id)
    if (result.ok) {
      setConfirming(false)
      router.refresh()
    } else {
      setError(result.error)
    }
    setPending(false)
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className="inline-flex h-9 items-center gap-1 rounded-full bg-bota px-3 text-[0.78rem] font-semibold text-primary-foreground transition-colors hover:bg-bota-deep disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Borrar
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="inline-flex h-9 items-center rounded-full px-2.5 text-[0.78rem] font-medium text-pine transition-colors hover:bg-pine/10"
        >
          No
        </button>
        {error ? <span className="sr-only">{error}</span> : null}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label="Borrar regalo"
      title="Borrar regalo"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pine text-cream transition-colors hover:bg-pine-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2"
    >
      <Trash2 className="h-4 w-4" strokeWidth={1.9} />
    </button>
  )
}
