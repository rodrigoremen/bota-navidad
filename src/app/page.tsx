import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PlusCircle, Gift } from 'lucide-react';
import Link from 'next/link';
import { getProfiles } from './api/actions';
import { UserAvatar } from '@/components/UserAvatar';

export default async function Home() {
	const profiles = await getProfiles();

	return (
		<div className="min-h-screen snow-effect">
			<div className="container mx-auto py-16 px-4">
			{/* Header */}
			<div className="text-center mb-16 space-y-6">
				<div className="flex items-center justify-center gap-4 mb-6">
					<span className="text-6xl bounce-emoji">🎄</span>
					<h1 className="text-5xl md:text-7xl font-bold text-rose-400 tracking-tight">
						Bota de Navidad
					</h1>
					<span className="text-6xl bounce-emoji">🎅</span>
				</div>
				<p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
					Comparte tus deseos navideños con familia y amigos
				</p>
			</div>				{/* Profile Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{profiles.map((profile) => (
						<Card key={profile.id} className="christmas-card group">
							<CardHeader className="flex flex-row items-center space-x-4 pb-4">
								<div className="relative">
									<UserAvatar name={profile.name} fotoPerfil={profile.fotoPerfil} size="md" />
									<span className="absolute -top-2 -right-2 text-2xl transform group-hover:scale-110 transition-transform">🎁</span>
								</div>
								<div className="flex-1">
									<CardTitle className="text-xl group-hover:text-rose-300 transition-colors duration-300">
										{profile.name}
									</CardTitle>
									<CardDescription className="flex items-center gap-2 text-sm mt-1">
										<Gift className="h-4 w-4 text-amber-300" />
										<span className="font-semibold text-emerald-300">{profile.wishlistCount}</span>
										<span>regalos en su bota</span>
									</CardDescription>
								</div>
							</CardHeader>
							<CardFooter>
								<Link href={`/profile/${profile.id}`} className="w-full">
									<Button className="w-full christmas-gradient hover:shadow-rose-500/40 transition-all">
										<Gift className="mr-2 h-4 w-4" />
										Ver regalos
									</Button>
								</Link>
							</CardFooter>
						</Card>
					))}

					{/* Add Profile Card */}
					<Card className="christmas-card border-dashed border-2 border-white/20 hover:border-rose-400/50 hover:bg-card/60 transition-all group">
						<CardHeader>
							<CardTitle className="text-center text-slate-400 group-hover:text-rose-300 transition-colors duration-300 text-lg">
								Añadir nuevo perfil
							</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center justify-center h-24">
							<Link href="/new-profile">
								<Button variant="outline" size="lg" className="border-emerald-500/40 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all">
									<PlusCircle className="mr-2 h-6 w-6" />
									Crear perfil
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
		</div>
	);
}
