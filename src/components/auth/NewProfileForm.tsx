"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { createAccount } from "@/app/api/auth-actions"
import { Button } from "@/components/ui/button"
import { Field, FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { ImageUpload } from "@/components/ImageUpload"
import { Dock } from "@/components/brand/Dock"

export function NewProfileForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [fotoPerfil, setFotoPerfil] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    setPending(true)
    setError("")
    const result = await createAccount(name, password, fotoPerfil || null)
    if (result.ok) {
      router.replace("/groups/new")
      return
    }
    setError(result.error)
    setPending(false)
  }

  return (
    <>
      <form id="new-profile" onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="card space-y-5 p-5">
          <div className="flex flex-col items-center gap-1.5">
            <ImageUpload
              value={fotoPerfil}
              onChange={setFotoPerfil}
              onRemove={() => setFotoPerfil("")}
              label="tu foto"
            />
            <p className="text-[0.78rem] text-muted-foreground">Opcional, pero ayuda a reconocerte.</p>
          </div>

          <Field label="Tu nombre" htmlFor="profile-name" required>
            <Input
              id="profile-name"
              name="name"
              autoComplete="name"
              autoCapitalize="words"
              placeholder="Ej. María"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Field>

          <Field
            label="Contraseña"
            htmlFor="profile-password"
            required
            hint="Con ella entras y proteges tu lista. No hay recuperación: apúntala."
          >
            <PasswordInput
              id="profile-password"
              name="password"
              autoComplete="new-password"
              placeholder="Mínimo 4 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={4}
              required
            />
          </Field>

          <FormMessage tone="error">{error}</FormMessage>
        </div>
      </form>

      <Dock>
        <Button
          type="submit"
          form="new-profile"
          size="lg"
          className="w-full"
          disabled={pending || name.trim().length < 2 || password.trim().length < 4}
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {pending ? "Creando perfil…" : "Crear perfil"}
        </Button>
      </Dock>
    </>
  )
}
