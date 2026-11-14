"use client"

import { useId } from "react"
import { cn } from "@/libs/utils"

/**
 * El regalo de la marca: caja roja con listón y moño dorado.
 * Dibujado a mano para no depender de emojis ni de imágenes externas.
 */
export function GiftMark({
  className,
  title = "Regalo",
}: {
  className?: string
  title?: string
}) {
  const uid = useId().replace(/:/g, "")
  const gold = `gold-${uid}`
  const goldDeep = `gold-deep-${uid}`
  const red = `red-${uid}`
  const redDeep = `red-deep-${uid}`

  return (
    <svg
      viewBox="0 0 128 128"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("h-20 w-20", className)}
    >
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE79B" />
          <stop offset="0.42" stopColor="#F3C64C" />
          <stop offset="1" stopColor="#C08A1D" />
        </linearGradient>
        <linearGradient id={goldDeep} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9A62E" />
          <stop offset="1" stopColor="#9C6C13" />
        </linearGradient>
        <linearGradient id={red} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#E24A56" />
          <stop offset="0.55" stopColor="#C62E3A" />
          <stop offset="1" stopColor="#9E1D28" />
        </linearGradient>
        <linearGradient id={redDeep} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A3202B" />
          <stop offset="1" stopColor="#7E131D" />
        </linearGradient>
      </defs>

      {/* sombra */}
      <ellipse cx="64" cy="120" rx="42" ry="6" fill="#0B2A21" opacity="0.22" />

      {/* cuerpo */}
      <rect x="20" y="61" width="88" height="56" rx="6" fill={`url(#${red})`} />
      <rect x="88" y="61" width="20" height="56" rx="6" fill={`url(#${redDeep})`} />
      <rect x="20" y="61" width="88" height="56" rx="6" fill="none" stroke="#7E131D" strokeOpacity="0.35" />

      {/* tapa */}
      <rect x="12" y="42" width="104" height="22" rx="6" fill={`url(#${red})`} />
      <rect x="94" y="42" width="22" height="22" rx="6" fill={`url(#${redDeep})`} />
      <rect x="12" y="42" width="104" height="22" rx="6" fill="none" stroke="#7E131D" strokeOpacity="0.3" />
      <rect x="16" y="45" width="96" height="4" rx="2" fill="#FFD9DA" opacity="0.18" />

      {/* listón vertical */}
      <rect x="57" y="61" width="14" height="56" fill={`url(#${gold})`} />
      <rect x="57" y="61" width="4" height="56" fill="#FFF0BF" opacity="0.45" />
      <rect x="68" y="61" width="3" height="56" fill={`url(#${goldDeep})`} opacity="0.8" />

      {/* listón horizontal */}
      <rect x="12" y="48" width="104" height="11" fill={`url(#${gold})`} />
      <rect x="12" y="48" width="104" height="3" fill="#FFF0BF" opacity="0.5" />
      <rect x="12" y="56" width="104" height="3" fill={`url(#${goldDeep})`} opacity="0.65" />

      {/* moño */}
      <path
        d="M62 45C50 22 26 19 22 32c-4 12 16 17 40 15Z"
        fill={`url(#${gold})`}
        stroke="#B57F16"
        strokeOpacity="0.55"
      />
      <path
        d="M66 45c12-23 36-26 40-13 4 12-16 17-40 15Z"
        fill={`url(#${gold})`}
        stroke="#B57F16"
        strokeOpacity="0.55"
      />
      <path
        d="M60 50c-6 14-14 24-25 29 3-14 12-25 20-31Z"
        fill={`url(#${gold})`}
        stroke="#B57F16"
        strokeOpacity="0.5"
      />
      <path
        d="M68 50c6 14 14 24 25 29-3-14-12-25-20-31Z"
        fill={`url(#${goldDeep})`}
        stroke="#B57F16"
        strokeOpacity="0.5"
      />
      <circle cx="64" cy="46" r="9.5" fill={`url(#${gold})`} stroke="#B57F16" strokeOpacity="0.6" />
      <circle cx="61" cy="43" r="3" fill="#FFFBEA" opacity="0.55" />
    </svg>
  )
}
