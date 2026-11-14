"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ImageOff, Link2, Loader2, Save } from "lucide-react"
import { addWishlistItem, updateWishlistItem, type WishlistView } from "@/app/api/actions"
import { fetchImageFromUrl } from "@/app/api/image-actions"
import { BackLink } from "@/components/brand/BackLink"
import { Dock } from "@/components/brand/Dock"
import { ImageUpload } from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Field, FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/libs/utils"

const CATEGORIES = [
  "Tecnología",
  "Ropa",
  "Libros",
  "Deportes",
  "Hogar",
  "Belleza",
  "Juguetes",
  "Otro",
]

const PRIORITIES = ["Baja", "Media", "Alta"] as const

export function WishlistItemForm({
  groupId,
  profileId,
  item,
  groupName,
}: {
  groupId: number
  profileId: number
  item?: WishlistView | null
  groupName: string
}) {
  const router = useRouter()
  const editing = Boolean(item)

  const [name, setName] = useState(item?.name ?? "")
  const [url, setUrl] = useState(item?.url ?? "")
  const [image, setImage] = useState(item?.image ?? "")
  const [description, setDescription] = useState(item?.description ?? "")
  const [price, setPrice] = useState(item?.price != null ? String(item.price) : "")
  const [category, setCategory] = useState(item?.category ?? "")
  const [priority, setPriority] = useState<string>(item?.priority ?? "Media")

  const [fetching, setFetching] = useState(false)
  const [fetchNote, setFetchNote] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const wishlistHref = `/groups/${groupId}/wishlist/${profileId}`

  // Trae la imagen del enlace una sola vez por URL, sin bucles.
  const attemptedUrl = useRef(item?.url ?? "")

  useEffect(() => {
    const cleanUrl = url.trim()
    if (!cleanUrl || !/^https?:\/\//i.test(cleanUrl)) return
    if (attemptedUrl.current === cleanUrl) return
    attemptedUrl.current = cleanUrl

    const timer = window.setTimeout(async () => {
      setFetching(true)
      setFetchNote("")
      try {
        const result = await fetchImageFromUrl(cleanUrl)
        if (result.success && result.imageUrl) {
          setImage(result.imageUrl)
          setFetchNote("Imagen encontrada")
        } else {
          setFetchNote("No encontramos foto en ese enlace. Puedes subir una.")
        }
      } catch {
        setFetchNote("No pudimos leer ese enlace.")
      } finally {
        setFetching(false)
      }
    }, 1100)

    return () => window.clearTimeout(timer)
  }, [url])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || !name.trim()) return

    setPending(true)
    setError("")

    const parsedPrice = Number.parseFloat(price.replace(",", "."))
    const payload = {
      name: name.trim(),
      url,
      image: image || null,
      description: description || null,
      price: Number.isFinite(parsedPrice) ? parsedPrice : null,
      category: category || null,
      priority,
    }

    const result = editing
      ? await updateWishlistItem(item!.id, payload)
      : await addWishlistItem({ groupId, profileId, ...payload })

    if (!result.ok) {
      setError(result.error)
      setPending(false)
      return
    }

    router.push(wishlistHref)
  }

  return (
    <>
      <div className="screen screen-pad-bottom min-h-dvh">
        <BackLink href={wishlistHref} className="mt-1">
          Mi WishList
        </BackLink>

        <header className="mt-5">
          <h1 className="text-[1.6rem] font-semibold leading-tight text-pine">
            {editing ? "Editar regalo" : "Agregar regalo"}
          </h1>
          <p className="mt-1 text-[0.9rem] leading-snug text-muted-foreground">
            Para el intercambio <span className="font-medium text-pine">{groupName}</span>.
          </p>
        </header>

        <form id="wishlist-item" onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="card space-y-5 p-5">
            <Field label="¿Qué te gustaría?" htmlFor="item-name" required>
              <Input
                id="item-name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ej. Audífonos, un libro, tenis…"
                autoCapitalize="sentences"
                maxLength={80}
                required
              />
            </Field>

            <Field
              label="Enlace del producto"
              htmlFor="item-url"
              hint="Pégalo y buscamos la foto por ti."
            >
              <div className="relative">
                <Link2
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine/60"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <Input
                  id="item-url"
                  name="url"
                  type="url"
                  inputMode="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://…"
                  className="pl-9 pr-10 normal-case"
                  autoComplete="off"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {fetching ? (
                    <Loader2 className="h-4 w-4 animate-spin text-pine" aria-hidden="true" />
                  ) : image && url ? (
                    <Check className="h-4 w-4 text-pine" strokeWidth={2.6} aria-hidden="true" />
                  ) : null}
                </span>
              </div>
              <span className="sr-only" aria-live="polite">
                {fetching ? "Buscando la imagen del enlace" : fetchNote}
              </span>
            </Field>

            <div className="flex flex-col items-center gap-2">
              <ImageUpload
                value={image}
                onChange={setImage}
                onRemove={() => {
                  setImage("")
                  setFetchNote("")
                }}
                shape="square"
                label="la foto del regalo"
              />
              <p className="text-center text-[0.78rem] leading-snug text-muted-foreground">
                {fetching
                  ? "Buscando la foto del enlace…"
                  : fetchNote || "Puedes subir una foto tuya si prefieres."}
              </p>
            </div>

            <Field label="Descripción" htmlFor="item-description">
              <textarea
                id="item-description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Color, talla, modelo o cualquier detalle que ayude."
                rows={3}
                maxLength={280}
                className="field min-h-[5.5rem] resize-none normal-case"
              />
            </Field>

            <Field label="Precio aproximado" htmlFor="item-price">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1rem] font-semibold text-pine/70">
                  $
                </span>
                <Input
                  id="item-price"
                  name="price"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="500"
                  className="pl-8"
                />
              </div>
            </Field>
          </div>

          <div className="card space-y-5 p-5">
            <fieldset>
              <legend className="text-[0.9rem] font-medium text-pine">Categoría</legend>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {CATEGORIES.map((option) => {
                  const active = category === option
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategory(active ? "" : option)}
                      className={cn(
                        "h-9 rounded-full px-3.5 text-[0.78rem] font-medium transition-colors",
                        active
                          ? "bg-pine text-cream"
                          : "bg-pine/8 text-pine hover:bg-pine/14"
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[0.9rem] font-medium text-pine">
                ¿Qué tantas ganas tienes?
              </legend>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5 rounded-full bg-pine/8 p-1.5">
                {PRIORITIES.map((option) => {
                  const active = priority === option
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPriority(option)}
                      className={cn(
                        "h-9 rounded-full text-[0.84rem] font-semibold transition-colors",
                        active
                          ? option === "Alta"
                            ? "bg-bota text-primary-foreground"
                            : option === "Media"
                              ? "bg-gold text-[#3a2a05]"
                              : "bg-sage text-[#10312a]"
                          : "text-pine/70 hover:text-pine"
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>

          <FormMessage tone="error">{error}</FormMessage>
        </form>

        {image ? (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[0.68rem] text-muted-foreground">
            <ImageOff className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            Si la foto no coincide, quítala y sube la tuya.
          </p>
        ) : null}
      </div>

      <Dock>
        <Button
          type="submit"
          form="wishlist-item"
          size="lg"
          className="w-full"
          disabled={pending || !name.trim()}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" strokeWidth={2.1} />
          )}
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Guardar regalo"}
        </Button>
      </Dock>
    </>
  )
}
