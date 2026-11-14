"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { updateProfile } from "@/app/api/actions"
import { BackLink } from "@/components/brand/BackLink"
import { Dock } from "@/components/brand/Dock"
import { ImageUpload } from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Field, FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

type ProfileData = {
  id: number
  name: string
  fotoPerfil: string | null
  colorFavorito: string | null
  tallaPlayera: string | null
  tallaPantalon: string | null
  tallaTenis: string | null
  pasatiempos: string | null
  comidaFavorita: string | null
  notas: string | null
}

export function ProfileEditForm({ profile }: { profile: ProfileData }) {
  const router = useRouter()

  const [name, setName] = useState(profile.name)
  const [fotoPerfil, setFotoPerfil] = useState(profile.fotoPerfil ?? "")
  const [password, setPassword] = useState("")
  const [colorFavorito, setColorFavorito] = useState(profile.colorFavorito ?? "")
  const [comidaFavorita, setComidaFavorita] = useState(profile.comidaFavorita ?? "")
  const [pasatiempos, setPasatiempos] = useState(profile.pasatiempos ?? "")
  const [tallaPlayera, setTallaPlayera] = useState(profile.tallaPlayera ?? "")
  const [tallaPantalon, setTallaPantalon] = useState(profile.tallaPantalon ?? "")
  const [tallaTenis, setTallaTenis] = useState(profile.tallaTenis ?? "")
  const [notas, setNotas] = useState(profile.notas ?? "")

  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || name.trim().length < 2) return

    setPending(true)
    setError("")

    const result = await updateProfile(profile.id, {
      name: name.trim(),
      fotoPerfil: fotoPerfil || null,
      colorFavorito: colorFavorito.trim() || null,
      comidaFavorita: comidaFavorita.trim() || null,
      pasatiempos: pasatiempos.trim() || null,
      tallaPlayera: tallaPlayera.trim() || null,
      tallaPantalon: tallaPantalon.trim() || null,
      tallaTenis: tallaTenis.trim() || null,
      notas: notas.trim() || null,
      ...(password.trim() ? { password } : {}),
    })

    if (!result.success) {
      setError(result.error ?? "No pudimos guardar tu perfil.")
      setPending(false)
      return
    }

    router.push("/")
  }

  return (
    <>
      <div className="screen screen-pad-bottom min-h-dvh">
        <BackLink href="/" className="mt-1">
          Inicio
        </BackLink>

        <header className="mt-5">
          <h1 className="text-[1.6rem] font-semibold leading-tight text-pine">Tu perfil</h1>
          <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">
            Mientras más completo, más fácil es acertarle a tu regalo.
          </p>
        </header>

        <form id="profile-edit" onSubmit={onSubmit} className="mt-6 space-y-4">
          <section className="card space-y-5 p-5">
            <div className="flex flex-col items-center">
              <ImageUpload
                value={fotoPerfil}
                onChange={setFotoPerfil}
                onRemove={() => setFotoPerfil("")}
                label="tu foto"
              />
            </div>

            <Field label="Tu nombre" htmlFor="edit-name" required>
              <Input
                id="edit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                autoCapitalize="words"
                required
              />
            </Field>

            <Field
              label="Cambiar contraseña"
              htmlFor="edit-password"
              hint="Déjala vacía si no quieres cambiarla."
            >
              <PasswordInput
                id="edit-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nueva contraseña"
                autoComplete="new-password"
              />
            </Field>
          </section>

          <section className="card space-y-5 p-5">
            <h2 className="text-[1rem] font-semibold text-ink">Para regalarte mejor</h2>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Color favorito" htmlFor="edit-color">
                <Input
                  id="edit-color"
                  value={colorFavorito}
                  onChange={(event) => setColorFavorito(event.target.value)}
                  placeholder="Verde pino"
                  maxLength={40}
                />
              </Field>
              <Field label="Comida favorita" htmlFor="edit-food">
                <Input
                  id="edit-food"
                  value={comidaFavorita}
                  onChange={(event) => setComidaFavorita(event.target.value)}
                  placeholder="Tacos"
                  maxLength={40}
                />
              </Field>
            </div>

            <Field label="Pasatiempos" htmlFor="edit-hobbies">
              <Input
                id="edit-hobbies"
                value={pasatiempos}
                onChange={(event) => setPasatiempos(event.target.value)}
                placeholder="Leer, correr, armar legos…"
                maxLength={80}
              />
            </Field>

            <div className="grid grid-cols-3 gap-2.5">
              <Field label="Playera" htmlFor="edit-shirt">
                <Input
                  id="edit-shirt"
                  value={tallaPlayera}
                  onChange={(event) => setTallaPlayera(event.target.value)}
                  placeholder="M"
                  className="text-center"
                  maxLength={8}
                />
              </Field>
              <Field label="Pantalón" htmlFor="edit-pants">
                <Input
                  id="edit-pants"
                  value={tallaPantalon}
                  onChange={(event) => setTallaPantalon(event.target.value)}
                  placeholder="32"
                  className="text-center"
                  maxLength={8}
                />
              </Field>
              <Field label="Tenis" htmlFor="edit-shoes">
                <Input
                  id="edit-shoes"
                  value={tallaTenis}
                  onChange={(event) => setTallaTenis(event.target.value)}
                  placeholder="26"
                  className="text-center"
                  maxLength={8}
                />
              </Field>
            </div>

            <Field label="Notas" htmlFor="edit-notes">
              <textarea
                id="edit-notes"
                value={notas}
                onChange={(event) => setNotas(event.target.value)}
                placeholder="Algo que quieras que sepan: alergias, cosas que no usas…"
                rows={3}
                maxLength={280}
                className="field min-h-[5.5rem] resize-none normal-case"
              />
            </Field>
          </section>

          <FormMessage tone="error">{error}</FormMessage>
        </form>
      </div>

      <Dock>
        <Button
          type="submit"
          form="profile-edit"
          size="lg"
          className="w-full"
          disabled={pending || name.trim().length < 2}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" strokeWidth={2.1} />
          )}
          {pending ? "Guardando…" : "Guardar perfil"}
        </Button>
      </Dock>
    </>
  )
}
