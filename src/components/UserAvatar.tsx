import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function stringToColor(string: string) {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
}

interface UserAvatarProps {
	name: string;
	fotoPerfil?: string | null;
	size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ name, fotoPerfil, size = 'md' }: UserAvatarProps) {
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase();
	const backgroundColor = stringToColor(name);

	const sizeClass = {
		sm: 'h-10 w-10 text-sm',
		md: 'h-16 w-16 text-xl',
		lg: 'h-24 w-24 text-3xl',
	}[size];

	return (
		<Avatar className={sizeClass}>
			{fotoPerfil && <AvatarImage src={fotoPerfil} alt={name} />}
			<AvatarFallback style={{ backgroundColor, color: '#fff' }}>
				{initials}
			</AvatarFallback>
		</Avatar>
	);
}
