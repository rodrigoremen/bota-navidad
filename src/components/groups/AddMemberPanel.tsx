"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Search, UserPlus } from "lucide-react"
import { addMember, createMemberAndAdd } from "@/app/api/group-actions"
import { BackLink } from "@/components/brand/BackLink"
import { UserAvatar } from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { Field, FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

type Candidate = { id: number; name: string; fotoPerfil: string | null }

export function AddMemberPanel({
  groupId,
  groupName,
  candidates,
}: {
  groupId: number
  groupName: string
  candidates: Candidate[]
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [showCreate, setShowCreate] = useState(candidates.length === 0)
  const [newName, setNewName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [creating, setCreating] = useState(false)

  const filtered = candidates.filter((candidate) =>
    candidate.name.toLocaleLowerCase("es").includes(query.trim().toLocaleLowerCase("es"))
  )

  async function add(id: number) {
    setBusyId(id)
    setError("")
    const result = await addMember(groupId, id)
    if (!result.ok) setError(result.error)
    setBusyId(null)
    router.refresh()
  }

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (creating) return

    setCreating(true)
    setError("")
    const result = await createMemberAndAdd(groupId, newName, newPassword)
    if (!result.ok) {
      setError(result.error)
      setCreating(false)
      return
    }

    setNewName("")
    setNewPassword("")
    setCreating(false)
    router.refresh()
  }

  return (
    <main className="screen screen-pad-bottom min-h-dvh">
      <BackLink href={`/groups/${groupId}`} className="mt-1">
        {groupName}
      </BackLink>

      <header className="mt-5">
        <h1 className="text-[1.6rem] font-semibold leading-tight text-pine">
          Añadir participante
        </h1>
        <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">
          Busca un perfil que ya exista o crea uno nuevo. También pueden unirse con el código.
        </p>
      </header>

      {candidates.length > 0 ? (
        <>
          <div className="relative mt-5">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine/60"
              strokeWidth={2}
              aria-hidden="true"
            />
            <label htmlFor="member-search" className="sr-only">
              Buscar perfil
            </label>
            <Input
              id="member-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre"
              className="pl-9"
              autoComplete="off"
            />
          </div>

          <ul className="stagger mt-3 space-y-2">
            {filtered.map((candidate) => (
              <li key={candidate.id} className="card flex items-center gap-3 p-3">
                <UserAvatar
                  name={candidate.name}
                  fotoPerfil={candidate.fotoPerfil}
                  size="sm"
                />
                <span className="min-w-0 flex-1 truncate text-[0.9rem] font-medium text-ink">
                  {candidate.name}
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => add(candidate.id)}
                  disabled={busyId === candidate.id}
                >
                  {busyId === candidate.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                  )}
                  Añadir
                </Button>
              </li>
            ))}
          </ul>

          {filtered.length === 0 ? (
            <p className="mt-4 text-center text-[0.84rem] text-muted-foreground">
              No encontramos a nadie con ese nombre.
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-5 rounded-xl bg-card/70 px-4 py-3 text-[0.84rem] leading-snug text-muted-foreground">
          Todos los perfiles que existen ya están en este grupo.
        </p>
      )}

      <section className="card mt-7 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-1.5 text-[1rem] font-semibold text-ink">
              <UserPlus className="h-4 w-4 text-pine" strokeWidth={2} aria-hidden="true" />
              ¿No tiene perfil?
            </h2>
            <p className="mt-1 text-[0.84rem] leading-snug text-muted-foreground">
              Créalo aquí y quedará dentro del intercambio.
            </p>
          </div>
          {!showCreate ? (
            <Button
              type="button"
              variant="soft"
              size="sm"
              onClick={() => setShowCreate(true)}
            >
              Crear
            </Button>
          ) : null}
        </div>

        {showCreate ? (
          <form onSubmit={create} className="mt-4 space-y-4">
            <Field label="Nombre" htmlFor="new-member-name" required>
              <Input
                id="new-member-name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Ej. Tía Rosa"
                autoCapitalize="words"
                required
              />
            </Field>
            <Field
              label="Contraseña"
              htmlFor="new-member-password"
              required
              hint="Se la compartes para que pueda entrar a su lista."
            >
              <PasswordInput
                id="new-member-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Mínimo 4 caracteres"
                autoComplete="new-password"
                minLength={4}
                required
              />
            </Field>
            <Button
              type="submit"
              className="w-full"
              disabled={creating || newName.trim().length < 2 || newPassword.trim().length < 4}
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {creating ? "Creando…" : "Crear y añadir"}
            </Button>
          </form>
        ) : null}
      </section>

      <div className="mt-4">
        <FormMessage tone="error">{error}</FormMessage>
      </div>
    </main>
  )
}
