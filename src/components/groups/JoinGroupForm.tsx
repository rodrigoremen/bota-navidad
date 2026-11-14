"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Users } from "lucide-react"
import { joinGroup } from "@/app/api/group-actions"
import { BackLink } from "@/components/brand/BackLink"
import { Dock } from "@/components/brand/Dock"
import { Button } from "@/components/ui/button"
import { FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function JoinGroupForm() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || code.trim().length < 4) return

    setPending(true)
    setError("")
    const result = await joinGroup(code)
    if (result.ok) {
      router.push(`/groups/${result.groupId}`)
      return
    }
    setError(result.error)
    setPending(false)
  }

  return (
    <>
      <div className="screen screen-pad-bottom min-h-dvh">
        <BackLink href="/" className="mt-1">
          Inicio
        </BackLink>

        <div className="mt-12 flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pine/10 text-pine">
            <Users className="h-7 w-7" strokeWidth={1.7} />
          </span>
          <h1 className="mt-5 text-balance text-[1.7rem] font-semibold leading-tight text-pine">
            Unirse a un grupo
          </h1>
          <p className="mx-auto mt-2 max-w-[30ch] text-pretty text-[0.9rem] leading-snug text-muted-foreground">
            Escribe el código que te compartieron. Se ve así: <span className="font-semibold text-pine">BOTA-7K2M</span>.
          </p>
        </div>

        <form id="join-group" onSubmit={onSubmit} className="mt-9">
          <label htmlFor="group-code" className="sr-only">
            Código del grupo
          </label>
          <Input
            id="group-code"
            name="code"
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            placeholder="BOTA-XXXX"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={12}
            className="tnum h-16 text-center text-[1.35rem] font-semibold uppercase tracking-[0.22em]"
            required
          />
          <div className="mt-4">
            <FormMessage tone="error">{error}</FormMessage>
          </div>
        </form>
      </div>

      <Dock>
        <Button
          type="submit"
          form="join-group"
          size="lg"
          className="w-full"
          disabled={pending || code.trim().length < 4}
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {pending ? "Buscando el grupo…" : "Unirme"}
        </Button>
      </Dock>
    </>
  )
}
