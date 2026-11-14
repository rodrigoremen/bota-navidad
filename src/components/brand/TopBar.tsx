import Link from "next/link"
import { LogOut, Settings2 } from "lucide-react"
import { logout } from "@/app/api/auth-actions"
import { UserAvatar } from "@/components/UserAvatar"

export function TopBar({
  profile,
  hint,
}: {
  profile: { id: number; name: string; fotoPerfil: string | null }
  hint?: string
}) {
  return (
    <header className="flex items-center gap-3 px-5 pt-6">
      <Link
        href={`/profile/${profile.id}/edit`}
        className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-mint"
        aria-label="Editar mi perfil"
      >
        <UserAvatar name={profile.name} fotoPerfil={profile.fotoPerfil} size="sm" />
      </Link>

      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {hint ?? "Tu cuenta"}
        </p>
        <p className="truncate text-[0.9rem] font-semibold text-pine">{profile.name}</p>
      </div>

      <Link
        href={`/profile/${profile.id}/edit`}
        aria-label="Editar mi perfil"
        className="flex h-10 w-10 items-center justify-center rounded-full text-pine/80 transition-colors hover:bg-pine/10 hover:text-pine"
      >
        <Settings2 className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </Link>

      <form action={logout}>
        <button
          type="submit"
          aria-label="Cerrar sesión"
          className="flex h-10 w-10 items-center justify-center rounded-full text-pine/80 transition-colors hover:bg-pine/10 hover:text-pine"
        >
          <LogOut className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
        </button>
      </form>
    </header>
  )
}
