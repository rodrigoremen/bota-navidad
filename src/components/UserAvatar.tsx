import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';

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
	size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ name, size = 'md' }: UserAvatarProps) {
	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase();
	const backgroundColor = stringToColor(name);

	const sizeClass = {
		sm: 'h-8 w-8 text-xs',
		md: 'h-12 w-12 text-lg',
		lg: 'h-16 w-16 text-2xl',
	}[size];

	return (
		<Avatar className={sizeClass}>
			<AvatarFallback style={{ backgroundColor, color: '#fff' }}>
				{initials}
			</AvatarFallback>
		</Avatar>
	);
}
