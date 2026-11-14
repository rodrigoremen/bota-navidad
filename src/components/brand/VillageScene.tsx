import { cn } from "@/libs/utils"

/**
 * Silueta del pueblito nevado que cierra la portada.
 * Decorativa: no aporta información.
 */
export function VillageScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 430 190"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={cn("relative block w-full", className)}
    >
      <g fill="currentColor">
        {/* suelo */}
        <path d="M0 158c40-8 70-4 104-6 38-2 60-8 104-6 44 2 78-2 118 2 40 4 74 0 104 -2v44H0Z" />

        {/* pino izquierda */}
        <path d="M34 158v-22h7v22Z" />
        <path d="M37 92 20 128h12l-9 16h28l-9-16h12Z" />
        <path d="M37 74 25 102h8l-7 12h22l-7-12h8Z" />

        {/* casa baja izquierda */}
        <path d="M72 158v-30h34v30Z" />
        <path d="M66 128 89 112l23 16Z" />
        <rect x="84" y="136" width="8" height="10" fill="#0E3329" />
        <rect x="72" y="120" width="5" height="10" />

        {/* edificio con cúpula */}
        <path d="M126 158v-42h30v42Z" />
        <path d="M122 116c0-8 38-8 38 0Z" />
        <path d="M141 116V96" />
        <rect x="134" y="124" width="7" height="10" fill="#0E3329" />
        <rect x="146" y="124" width="7" height="10" fill="#0E3329" />

        {/* casa central */}
        <path d="M170 158v-32h44v32Z" />
        <path d="M164 126 192 106l28 20Z" />
        <rect x="186" y="136" width="12" height="22" fill="#0E3329" />
        <rect x="174" y="132" width="7" height="8" fill="#0E3329" />
        <rect x="204" y="132" width="7" height="8" fill="#0E3329" />

        {/* iglesia / torre */}
        <path d="M250 158V96h26v62Z" />
        <path d="M248 96 263 62l15 34Z" />
        <path d="M263 62V48" />
        <path d="M259 54h8" />
        <rect x="258" y="112" width="10" height="16" rx="5" fill="#0E3329" />
        <rect x="255" y="140" width="6" height="8" fill="#0E3329" />
        <rect x="267" y="140" width="6" height="8" fill="#0E3329" />

        {/* casa derecha */}
        <path d="M298 158v-34h34v34Z" />
        <path d="M292 124 315 108l23 16Z" />
        <rect x="308" y="134" width="8" height="10" fill="#0E3329" />

        {/* torre derecha */}
        <path d="M344 158v-48h24v48Z" />
        <path d="M340 110 356 78l16 32Z" />
        <path d="M356 78V64" />
        <rect x="352" y="124" width="8" height="10" fill="#0E3329" />

        {/* pino derecha */}
        <path d="M392 158v-24h7v24Z" />
        <path d="M395 86 376 126h13l-10 18h32l-10-18h13Z" />
        <path d="M395 66 382 98h9l-8 13h24l-8-13h9Z" />

        {/* arbustos */}
        <path d="M0 158c8-6 16-6 24 0Z" />
        <path d="M54 158c6-5 12-5 18 0Z" />
        <path d="M222 158c7-5 13-5 20 0Z" />
        <path d="M410 158c7-5 13-5 20 0Z" />
      </g>

      <g fill="#FAF7F2" opacity="0.38">
        <circle cx="18" cy="42" r="1.6" />
        <circle cx="60" cy="26" r="1.2" />
        <circle cx="96" cy="52" r="1.8" />
        <circle cx="150" cy="30" r="1.3" />
        <circle cx="206" cy="46" r="1.5" />
        <circle cx="252" cy="22" r="1.1" />
        <circle cx="316" cy="40" r="1.7" />
        <circle cx="372" cy="24" r="1.2" />
        <circle cx="412" cy="52" r="1.6" />
        <circle cx="38" cy="66" r="1.1" />
        <circle cx="284" cy="60" r="1.3" />
      </g>
    </svg>
  )
}
