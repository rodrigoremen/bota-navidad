'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { addWishlistItem } from '@/app/api/actions';

export default function NewItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const router = useRouter();
	const { id } = use(params);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() && url.trim()) {
			await addWishlistItem(parseInt(id), name, url);
			router.push(`/profile/${id}`);
			router.refresh();
		}
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<Card className="max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Añade un nuevo regalo</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<Input
							type="text"
							placeholder="Ingresa el nombre del regalo"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full"
						/>
						<Input
							type="url"
							placeholder="Ingresa el link del regalo"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="w-full"
						/>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push(`/profile/${id}`)}
							className="w-full sm:w-auto"
						>
							Cancelar
						</Button>
						<Button type="submit" className="w-full sm:w-auto">
							Añadir regalo
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
