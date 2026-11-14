import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const PALETTES = [
	{ bg: '#1F5C4A', fg: '#FAF7F2' },
	{ bg: '#2B6B57', fg: '#FAF7F2' },
	{ bg: '#A3202B', fg: '#FFF9F5' },
	{ bg: '#B8891F', fg: '#2A1C00' },
	{ bg: '#4E7C6C', fg: '#FAF7F2' },
	{ bg: '#7A3E3E', fg: '#FAF7F2' },
];

function pickPalette(seed: string) {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}
	return PALETTES[Math.abs(hash) % PALETTES.length];
}

interface UserAvatarProps {
	name: string;
	fotoPerfil?: string | null;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}

export function UserAvatar({ name, fotoPerfil, size = 'md', className }: UserAvatarProps) {
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase();

	const palette = pickPalette(name || 'bota');

	const sizeClass = {
		sm: 'h-9 w-9 text-[0.68rem]',
		md: 'h-12 w-12 text-sm',
		lg: 'h-20 w-20 text-xl',
		xl: 'h-28 w-28 text-3xl',
	}[size];

	return (
		<Avatar
			className={`${sizeClass} ring-2 ring-cream/70 shadow-[0_2px_10px_rgba(17,58,46,0.18)] ${className ?? ''}`}
		>
			{fotoPerfil ? (
				<AvatarImage src={fotoPerfil} alt={`Foto de ${name}`} className="object-cover" />
			) : null}
			<AvatarFallback
				style={{ backgroundColor: palette.bg, color: palette.fg }}
				className="font-semibold tracking-wide"
			>
				{initials || '?'}
			</AvatarFallback>
		</Avatar>
	);
}
