"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-[0.08em] text-cream transition-colors hover:bg-cream/20"
      aria-label={copied ? "Código copiado" : `Copiar código ${code}`}
    >
      <span className="tnum">{code}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      ) : (
        <Copy className="h-3.5 w-3.5" strokeWidth={2} />
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Código copiado" : ""}
      </span>
    </button>
  )
}
