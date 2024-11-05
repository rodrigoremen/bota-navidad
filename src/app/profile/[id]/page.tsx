import { use } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PlusCircle, ExternalLink, Gift, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';
import { getProfile } from '@/app/api/actions';

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
		<div className="container mx-auto py-8 px-4">
			<div className="flex flex-col items-center justify-center mb-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
				<UserAvatar name={profile.name} size="lg" />
				<h1 className="text-2xl font-bold text-white sm:text-4xl">
					Bota de navidad de {profile.name}
				</h1>
				<Gift className="text-white h-8 w-8 sm:h-10 sm:w-10" />
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{profile.wishlist.map((item) => (
					<Card key={item.id}>
						<CardHeader>
							<CardTitle>{item.name}</CardTitle>
						</CardHeader>
						<CardFooter>
							<a href={item.url} target="_blank" rel="noopener noreferrer">
								<Button>
									<ExternalLink className="mr-2 h-4 w-4" />
									Ver regalo
								</Button>
							</a>
						</CardFooter>
					</Card>
				))}
				<Card>
					<CardHeader>
						<CardTitle>Añadir un nuevo regalo</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center h-24">
						<Link href={`/profile/${id}/new-item`} passHref>
							<Button variant="outline" size="lg">
								<PlusCircle className="mr-2 h-6 w-6" />
								Añadir regalo
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
			<div className="mt-8 text-center">
				<Link href="/" passHref>
					<Button variant="outline" className="text-white">
						<ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" /> Regresar al los
						perfiles
					</Button>
				</Link>
			</div>
		</div>
	);
}
