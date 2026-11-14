"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { createGroup, updateGroup } from "@/app/api/group-actions"
import { BackLink } from "@/components/brand/BackLink"
import { Dock } from "@/components/brand/Dock"
import { GiftMark } from "@/components/brand/GiftMark"
import { Button } from "@/components/ui/button"
import { Field, FormMessage } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"

type Initial = {
  id?: number
  name: string
  exchangeDate: string | null
  budget: number | null
  allowComments: boolean
}

function ToggleRow({
  label,
  checked,
  onChange,
  id,
}: {
  label: string
  checked: boolean
  onChange: (next: boolean) => void
  id: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="cursor-pointer text-[0.9rem] font-medium text-ink">
        {label}
      </label>
      <Toggle id={id} label={label} checked={checked} onChange={onChange} />
    </div>
  )
}

export function GroupSettingsForm({
  mode,
  groupName,
  defaultOwnerName,
  initial,
  footer,
}: {
  mode: "create" | "edit"
  groupName?: string
  defaultOwnerName?: string
  initial?: Initial
  footer?: React.ReactNode
}) {
  const router = useRouter()

  const [name, setName] = useState(initial?.name ?? groupName ?? "")
  const [ownerName, setOwnerName] = useState(defaultOwnerName ?? "")
  const [useDate, setUseDate] = useState(Boolean(initial?.exchangeDate))
  const [date, setDate] = useState(initial?.exchangeDate ?? "")
  const [useBudget, setUseBudget] = useState(initial?.budget != null)
  const [budget, setBudget] = useState(
    initial?.budget != null ? String(initial.budget) : ""
  )
  const [comments, setComments] = useState(initial?.allowComments ?? true)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const canSubmit = name.trim().length >= 2 && (!useDate || date.length > 0)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || !canSubmit) return

    setPending(true)
    setError("")

    const parsedBudget = Number.parseFloat(budget.replace(",", "."))
    const payload = {
      name: name.trim(),
      exchangeDate: useDate && date ? date : null,
      budget: useBudget && Number.isFinite(parsedBudget) ? parsedBudget : null,
      allowComments: comments,
    }

    if (mode === "create") {
      const created = await createGroup({ ...payload, ownerName })
      if (!created.ok) {
        setError(created.error)
        setPending(false)
        return
      }
      router.push(`/groups/${created.groupId}`)
      return
    }

    const updated = await updateGroup(initial!.id!, payload)
    if (!updated.ok) {
      setError(updated.error)
      setPending(false)
      return
    }

    router.push(`/groups/${initial!.id}`)
  }

  return (
    <>
      <div className="screen screen-pad-bottom min-h-dvh">
        <BackLink href={mode === "create" ? "/groups/new" : `/groups/${initial?.id}`}>
          Atrás
        </BackLink>

        <h1 className="mt-6 text-center text-[1.7rem] font-semibold text-pine">Configuración</h1>
        {name ? (
          <p className="mt-1 text-center text-[0.84rem] font-medium text-muted-foreground">{name}</p>
        ) : null}

        <form id="exchange-settings" onSubmit={onSubmit} className="mt-9">
          <h2 className="mx-auto max-w-[22ch] text-balance text-center text-[1.35rem] font-semibold leading-tight text-ink">
            ¡Configuremos el intercambio!
          </h2>

          {mode === "edit" ? (
            <div className="mt-7">
              <Field label="Nombre del grupo" htmlFor="group-name" required>
                <Input
                  id="group-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={48}
                  required
                />
              </Field>
            </div>
          ) : null}

          <div className="mt-8 space-y-6">
            <div className="space-y-3">
              <ToggleRow
                id="toggle-date"
                label="Añadir fecha"
                checked={useDate}
                onChange={setUseDate}
              />
              {useDate ? (
                <Input
                  type="date"
                  aria-label="Fecha del intercambio"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  className="rise"
                />
              ) : null}
            </div>

            <div className="space-y-3">
              <ToggleRow
                id="toggle-budget"
                label="Añadir presupuesto"
                checked={useBudget}
                onChange={setUseBudget}
              />
              {useBudget ? (
                <div className="relative rise">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1rem] font-semibold text-pine/70">
                    $
                  </span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.01"
                    placeholder="500"
                    aria-label="Presupuesto aproximado"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    className="pl-8"
                  />
                </div>
              ) : null}
            </div>

            <ToggleRow
              id="toggle-comments"
              label="Añadir comentarios"
              checked={comments}
              onChange={setComments}
            />
          </div>

          {mode === "create" ? (
            <div className="mt-9">
              <Field label="Mi nombre es…" htmlFor="owner-name" hint="Así te verán los demás participantes.">
                <Input
                  id="owner-name"
                  name="ownerName"
                  autoComplete="name"
                  autoCapitalize="words"
                  value={ownerName}
                  onChange={(event) => setOwnerName(event.target.value)}
                  placeholder="Escribe aquí"
                />
              </Field>
            </div>
          ) : null}

          <div className="mt-9 flex items-center gap-3.5 rounded-2xl bg-pine px-4 py-4 text-cream shadow-[0_10px_30px_-14px_rgba(17,58,46,0.7)]">
            <GiftMark className="h-14 w-14 shrink-0" title="" />
            <div className="min-w-0">
              <p className="text-[0.9rem] font-semibold leading-snug">Añade a tu WishList</p>
              <p className="mt-0.5 text-[0.78rem] leading-snug text-cream/75">
                ¿Qué te gustaría tener para este intercambio?
              </p>
            </div>
          </div>

          <div className="mt-6">
            <FormMessage tone="error">{error}</FormMessage>
          </div>
        </form>

        {footer ? <div className="mt-2">{footer}</div> : null}
      </div>

      <Dock>
        <Button
          type="submit"
          form="exchange-settings"
          size="lg"
          className="w-full"
          disabled={!canSubmit || pending}
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {pending ? "Guardando…" : mode === "create" ? "Siguiente" : "Guardar cambios"}
          {!pending ? <ArrowRight className="h-4 w-4" strokeWidth={2.2} /> : null}
        </Button>
      </Dock>
    </>
  )
}
