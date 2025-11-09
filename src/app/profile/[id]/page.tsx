import { use } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PlusCircle, ExternalLink, Gift, ChevronLeft, DollarSign, Tag, Zap } from 'lucide-react';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';
import { getProfile } from '@/app/api/actions';
import Image from 'next/image';
import { formatMXNPrice } from '@/libs/utils';

export default function ProfilePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const profile = use(getProfile(parseInt(id)));

	if (!profile) {
		return (
			<div className="container mx-auto py-8 text-center">
				Profile not found
			</div>
		);
	}

	return (
		<div className="min-h-screen snow-effect">
			<div className="container mx-auto py-6 sm:py-12 px-4">
				{/* Header with Profile */}
				<div className="text-center mb-8 sm:mb-12">
					<Link href="/">
						<Button variant="ghost" className="mb-4 sm:mb-6 text-slate-400 hover:text-slate-200 hover:bg-white/8 text-sm transition-all">
							<ChevronLeft className="mr-2 h-4 w-4" />
							Volver a perfiles
						</Button>
					</Link>

					<div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5">
						<div className="relative">
							<UserAvatar name={profile.name} fotoPerfil={profile.fotoPerfil} size="lg" />
							<span className="absolute -top-2 -right-2 text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform">🎁</span>
						</div>
						<div className="space-y-3">
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 via-red-400 to-amber-300 bg-clip-text text-transparent tracking-tight">
								Bota de {profile.name}
							</h1>
							<p className="text-slate-400 text-sm sm:text-base flex items-center justify-center gap-2">
								<Gift className="h-4 w-4 text-emerald-400" />
								<span className="font-semibold text-emerald-300">{profile.wishlist.length}</span>
								<span>regalos en la lista</span>
							</p>
							<Link href={`/profile/${id}/edit`}>
								<Button variant="outline" size="sm" className="mt-3 border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400/60 text-amber-300 hover:text-amber-200 text-xs sm:text-sm transition-all">
									✏️ Editar perfil
								</Button>
							</Link>
						</div>
					</div>
				</div>				{/* Profile Info Section */}
				{(profile.colorFavorito || profile.tallaPlayera || profile.tallaPantalon || profile.tallaTenis || profile.pasatiempos || profile.comidaFavorita || profile.notas) && (
					<Card className="christmas-card mb-8 max-w-4xl mx-auto">
						<CardHeader>
							<CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								✨ Información Personal
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{profile.colorFavorito && (
								<div className="space-y-1">
									<p className="text-sm text-gray-400">🎨 Color Favorito</p>
									<p className="text-white font-semibold">{profile.colorFavorito}</p>
								</div>
							)}
							{profile.comidaFavorita && (
								<div className="space-y-1">
									<p className="text-sm text-gray-400">🍕 Comida Favorita</p>
									<p className="text-white font-semibold">{profile.comidaFavorita}</p>
								</div>
							)}
							{profile.pasatiempos && (
								<div className="space-y-1">
									<p className="text-sm text-gray-400">🎮 Pasatiempos</p>
									<p className="text-white font-semibold">{profile.pasatiempos}</p>
								</div>
							)}
							{profile.tallaPlayera && (
								<div className="space-y-1">
									<p className="text-sm text-gray-400">👕 Talla Playera</p>
									<p className="text-white font-semibold">{profile.tallaPlayera}</p>
								</div>
							)}
							{profile.tallaPantalon && (
								<div className="space-y-1">
									<p className="text-sm text-gray-400">👖 Talla Pantalón</p>
									<p className="text-white font-semibold">{profile.tallaPantalon}</p>
								</div>
							)}
							{profile.tallaTenis && (
								<div className="space-y-1">
									<p className="text-sm text-gray-400">👟 Talla Tenis</p>
									<p className="text-white font-semibold">{profile.tallaTenis}</p>
								</div>
							)}
							{profile.notas && (
								<div className="space-y-1 md:col-span-2">
									<p className="text-sm text-gray-400">📝 Notas Adicionales</p>
									<p className="text-white">{profile.notas}</p>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* Wishlist Grid */}
				<div className="max-w-6xl mx-auto">
					<h2 className="text-lg sm:text-2xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">🎁 Lista de Regalos</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{profile.wishlist.map((item, index) => (
							<Card key={item.id} className="christmas-card group flex flex-col overflow-hidden h-full" style={{ animationDelay: `${index * 0.1}s` }}>
								{/* Imagen del regalo */}
								{item.image && (
									<div className="relative w-full h-40 overflow-hidden bg-black/20 flex items-center justify-center">
										<Image
											src={item.image}
											alt={item.name}
											fill
											className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
										/>
									</div>
								)}

								<CardHeader className={item.image ? 'pb-2' : ''}>
									<div className="space-y-2">
										<CardTitle className="text-lg group-hover:text-amber-300 transition-colors">
											{item.name}
										</CardTitle>
										{/* Categoría y Prioridad */}
										<div className="flex gap-2 flex-wrap">
											{item.category && (
												<span className="inline-flex items-center gap-1 bg-orange-500/25 text-orange-300 text-xs px-2 py-1 rounded-sm">
													<Tag className="h-3 w-3" />
													{item.category}
												</span>
											)}
											{item.priority && (
												<span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-sm font-medium ${item.priority === 'Alta'
														? 'bg-rose-500/25 text-rose-300'
														: item.priority === 'Media'
															? 'bg-amber-500/25 text-amber-300'
															: 'bg-emerald-500/25 text-emerald-300'
													}`}>
													<Zap className="h-3 w-3" />
													{item.priority}
												</span>
											)}
										</div>
									</div>
								</CardHeader>

								<CardContent className="flex-1 space-y-3 pb-3">
									{/* Descripción */}
									{item.description && (
										<p className="text-sm text-slate-300 line-clamp-2">
											{item.description}
										</p>
									)}

									{/* Precio */}
									{item.price && (
										<div className="flex items-center gap-2">
											<DollarSign className="h-4 w-4 text-amber-400" />
											<span className="text-lg font-semibold text-amber-300">{formatMXNPrice(item.price)}</span>
										</div>
									)}
								</CardContent>

								<CardFooter>
									<a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full">
										<Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30">
											<ExternalLink className="mr-2 h-4 w-4" />
											Ver regalo
										</Button>
									</a>
								</CardFooter>
							</Card>
						))}

						{/* Add New Gift Card */}
						<Card className="christmas-card border-dashed border-2 border-white/20 hover:border-amber-400/50 hover:bg-card/60 transition-all group">
							<CardHeader>
								<CardTitle className="text-center text-slate-400 group-hover:text-amber-300 transition-colors text-lg">
									✨ Añadir nuevo regalo
								</CardTitle>
							</CardHeader>
							<CardContent className="flex items-center justify-center h-24">
								<Link href={`/profile/${id}/new-item`}>
									<Button variant="outline" size="lg" className="border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400/60 transition-all">
										<PlusCircle className="mr-2 h-6 w-6" />
										Añadir regalo
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
