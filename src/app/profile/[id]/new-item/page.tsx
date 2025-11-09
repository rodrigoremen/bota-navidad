'use client';

import { useState, useEffect } from 'react';
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
import { PlusCircle, Gift, ExternalLink, Image as ImageIcon, DollarSign, Tag, Zap, Loader2 } from 'lucide-react';
import { addWishlistItem, fetchImageFromUrl } from '@/app/api/actions';
import { ImageUpload } from '@/components/ImageUpload';
import Image from 'next/image';
import { formatMXNPrice } from '@/libs/utils';

const CATEGORIES = ['Tecnología', 'Ropa', 'Libros', 'Deportes', 'Hogar', 'Belleza', 'Juguetes', 'Otro'];
const PRIORITIES = ['Baja', 'Media', 'Alta'];

export default function NewItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [priority, setPriority] = useState('Media');
	const router = useRouter();
	const { id } = use(params);

	const [isLoadingImage, setIsLoadingImage] = useState(false);
	const [imageError, setImageError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Auto-fetch image cuando se pega una URL válida
	useEffect(() => {
		const debounceTimer = setTimeout(async () => {
			if (url.trim() && !image && !isLoadingImage && (url.startsWith('http://') || url.startsWith('https://'))) {
				setIsLoadingImage(true);
				setImageError('');

				try {
					const result = await fetchImageFromUrl(url);
					if (result.success && result.imageUrl) {
						setImage(result.imageUrl);
						setImageError('');
					} else {
						// No mostrar error, simplemente no hay imagen disponible
						console.log('No image found:', result.error);
					}
				} catch (error) {
					console.error('Error auto-fetching image:', error);
				} finally {
					setIsLoadingImage(false);
				}
			}
		}, 1500); // Espera 1.5 segundos después de que el usuario termine de escribir

		return () => clearTimeout(debounceTimer);
	}, [url, image, isLoadingImage]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;
		if (isSubmitting) return; // Evita múltiples envíos

		setIsSubmitting(true);
		try {
			await addWishlistItem(parseInt(id), name, url, image, description, price ? parseFloat(price) : null, category, priority);
			router.push(`/profile/${id}`);
			router.refresh();
		} catch (error) {
			console.error('Error adding item:', error);
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen snow-effect flex items-center justify-center">
			<div className="container mx-auto py-8 px-4">
				<div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
					{/* Formulario */}
					<Card className="christmas-card">
						<CardHeader className="text-center space-y-3">
							<div className="text-6xl mb-2">🎁</div>
							<CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-rose-400 bg-clip-text text-transparent">
								Añade un nuevo regalos
							</CardTitle>
							<p className="text-slate-400 text-sm font-light">Comparte qué deseas para esta Navidad</p>
						</CardHeader>
						<form onSubmit={handleSubmit}>
							<CardContent className="space-y-5">
								{/* Nombre del regalo */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium flex items-center gap-2">
										<Gift className="h-4 w-4 text-emerald-400" />
										Nombre del regalo *
									</label>
									<Input
										type="text"
										placeholder="Ej: Libro de Harry Potter, PlayStation 5..."
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all text-slate-100 placeholder:text-slate-500"
										required
									/>
								</div>

								{/* Imagen */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium flex items-center gap-2">
										<ImageIcon className="h-4 w-4 text-purple-400" />
										Imagen del regalo
									</label>
									<ImageUpload
										value={image}
										onChange={setImage}
										onRemove={() => setImage('')}
									/>
								</div>

								{/* Descripción */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium">Descripción</label>
									<textarea
										placeholder="Cuéntanos qué te atrae de este regalo..."
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all resize-none"
										rows={3}
									/>
								</div>

								{/* URL */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium flex items-center gap-2">
										<ExternalLink className="h-4 w-4 text-blue-400" />
										Link del regalo (opcional)
									</label>
									<div className="relative">
										<Input
											type="url"
											placeholder="https://... (opcional, puede ser artículo físico)"
											value={url}
											onChange={(e) => setUrl(e.target.value)}
											className="w-full bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all pr-10 text-slate-100 placeholder:text-slate-500"
										/>
										{isLoadingImage && (
											<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
												<Loader2 className="h-4 w-4 animate-spin text-purple-400" />
											</div>
										)}
										{image && url.trim() && (
											<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
												<div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
													<span className="text-white text-xs font-bold">✓</span>
												</div>
											</div>
										)}
									</div>
									{imageError && (
										<div className="bg-rose-500/10 border border-rose-500/20 rounded px-3 py-2">
											<p className="text-xs text-rose-400">⚠️ {imageError}</p>
										</div>
									)}
									<p className="text-xs text-slate-500">
										{isLoadingImage ? '🔄 Buscando imagen...' : image && url.trim() ? '✅ Imagen obtenida automáticamente' : 'Pega un enlace (Amazon, Google Shopping, MercadoLibre, etc.) para obtener la imagen automáticamente'}
									</p>
								</div>

								{/* Precio */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium flex items-center gap-2">
										<DollarSign className="h-4 w-4 text-amber-400" />
										Precio aproximado (opcional)
									</label>
									<Input
										type="number"
										placeholder="99.99"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										step="0.01"
										min="0"
										className="w-full bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all text-slate-100 placeholder:text-slate-500"
									/>
								</div>

								{/* Categoría */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium flex items-center gap-2">
										<Tag className="h-4 w-4 text-orange-400" />
										Categoría (opcional)
									</label>
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-slate-100 focus:border-orange-500/50 focus:ring-orange-500/20 transition-all cursor-pointer"
									>
										<option value="">Selecciona una categoría</option>
										{CATEGORIES.map((cat) => (
											<option key={cat} value={cat}>
												{cat}
											</option>
										))}
									</select>
								</div>

								{/* Prioridad */}
								<div className="space-y-2">
									<label className="text-sm text-slate-300 font-medium flex items-center gap-2">
										<Zap className="h-4 w-4 text-rose-400" />
										Prioridad
									</label>
									<div className="flex gap-2">
										{PRIORITIES.map((p) => (
											<button
												key={p}
												type="button"
												onClick={() => setPriority(p)}
												className={`flex-1 py-2 rounded-md transition-colors text-sm font-medium ${priority === p
													? p === 'Alta'
														? 'bg-rose-500/80 text-white'
														: p === 'Media'
															? 'bg-amber-500/80 text-white'
															: 'bg-emerald-500/80 text-white'
													: 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
													}`}
											>
												{p}
											</button>
										))}
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
								<Button
									type="button"
									variant="outline"
									onClick={() => router.push(`/profile/${id}`)}
									className="w-full sm:w-auto border-slate-600/50 hover:bg-white/5 hover:border-slate-500 transition-all"
									disabled={isSubmitting}
								>
									Cancelar
								</Button>
								<Button
									type="submit"
									className="w-full sm:flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Añadiendo...
										</>
									) : (
										<>
											<PlusCircle className="mr-2 h-4 w-4" />
											Añadir a mi bota
										</>
									)}
								</Button>
							</CardFooter>
						</form>
					</Card>

					{/* Previsualización */}
					<Card className="christmas-card">
						<CardHeader>
							<CardTitle className="text-xl text-center">Previsualización</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{image && (
								<div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/20 bg-black/20 flex items-center justify-center">
									<Image
										src={image}
										alt="Preview"
										fill
										className="object-contain p-2"
									/>
								</div>
							)}

							{name && (
								<div>
									<h3 className="text-xl font-bold text-slate-100">{name}</h3>
									{category && (
										<p className="text-xs text-slate-400 mt-1">
											<span className="inline-block bg-orange-500/20 px-2 py-1 rounded text-orange-300">{category}</span>
										</p>
									)}
								</div>
							)}

							{description && (
								<div>
									<p className="text-sm text-slate-300">{description}</p>
								</div>
							)}

							{price && (
								<div className="flex items-center gap-2">
									<DollarSign className="h-4 w-4 text-amber-400" />
									<span className="text-lg font-semibold text-amber-300">
										{formatMXNPrice(parseFloat(price))}
									</span>
								</div>
							)}

							{priority && (
								<div className="flex items-center gap-2">
									<Zap className="h-4 w-4" />
									<span className={`text-sm font-medium ${priority === 'Alta'
										? 'text-rose-400'
										: priority === 'Media'
											? 'text-amber-400'
											: 'text-emerald-400'
										}`}>
										Prioridad: {priority}
									</span>
								</div>
							)}

							{url && (
								<div className="mt-4 pt-4 border-t border-white/10">
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
									>
										<ExternalLink className="h-4 w-4" />
										Ver producto
									</a>
								</div>
							)}

							{!name && !description && !image && (
								<div className="text-center py-8 text-slate-500">
									<Gift className="h-12 w-12 mx-auto mb-2 opacity-50" />
									<p>La previsualización aparecerá aquí</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
