"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, LogIn } from "lucide-react"
import { login } from "@/app/api/auth-actions"
import { Button } from "@/components/ui/button"
import { Field, FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

export function LoginForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    setPending(true)
    setError("")
    const result = await login(name, password)
    if (result.ok) {
      router.replace("/")
      return
    }
    setError(result.error)
    setPending(false)
  }

  return (
    <form onSubmit={onSubmit} className="card fade p-5">
      <div className="space-y-4">
        <Field label="Tu nombre" htmlFor="login-name" required>
          <Input
            id="login-name"
            name="name"
            autoComplete="username"
            autoCapitalize="words"
            placeholder="Ej. María"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Field>

        <Field label="Tu contraseña" htmlFor="login-password" required>
          <PasswordInput
            id="login-password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>

        <FormMessage tone="error">{error}</FormMessage>

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" strokeWidth={2} />
          )}
          {pending ? "Entrando…" : "Entrar"}
        </Button>
      </div>

      <p className="mt-5 text-center text-[0.84rem] text-muted-foreground">
        ¿Primera vez por aquí?{" "}
        <Link href="/new-profile" className="link-quiet font-medium">
          Crea tu perfil
        </Link>
      </p>
    </form>
  )
}
