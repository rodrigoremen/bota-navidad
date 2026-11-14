"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { BackLink } from "@/components/brand/BackLink"
import { Dock } from "@/components/brand/Dock"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewGroupNameForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const clean = name.trim()

  return (
    <>
      <div className="screen screen-pad-bottom min-h-dvh">
        <BackLink href="/" className="mt-1">
          Tus intercambios
        </BackLink>

        <h1 className="mt-7 text-center text-[1.7rem] font-semibold text-pine">Nuevo grupo</h1>

        <form
          id="group-name"
          className="mt-16"
          onSubmit={(event) => {
            event.preventDefault()
            if (clean.length < 2) return
            router.push(`/groups/new/settings?name=${encodeURIComponent(clean)}`)
          }}
        >
          <label
            htmlFor="group-name-input"
            className="mx-auto block max-w-[20ch] text-balance text-center text-[1.45rem] font-semibold leading-tight text-ink"
          >
            Para empezar, ponle un nombre a tu grupo
          </label>

          <Input
            id="group-name-input"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Escribe aquí"
            autoFocus
            autoCapitalize="sentences"
            maxLength={48}
            className="mt-7 h-14 text-center text-[1rem]"
            required
            minLength={2}
          />

          <p className="mt-3 text-center text-[0.78rem] leading-snug text-muted-foreground">
            Puede ser el nombre de la familia, la oficina o el plan: “Intercambio primos”.
          </p>
        </form>

        <p className="mt-10 text-center text-[0.78rem] leading-snug text-muted-foreground">
          ¿Ya tienes un código?{" "}
          <Link href="/groups/join" className="link-quiet font-medium">
            Únete a un grupo
          </Link>
        </p>
      </div>

      <Dock>
        <Button
          type="submit"
          form="group-name"
          size="lg"
          className="w-full"
          disabled={clean.length < 2}
        >
          Siguiente
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </Button>
      </Dock>
    </>
  )
}
