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
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-4xl font-bold mb-8 text-center text-white">
				Bota de navidad 🎅
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{profiles.map((profile) => (
					<Card key={profile.id}>
						<CardHeader className="flex flex-row items-center space-x-4 pb-2">
							<UserAvatar name={profile.name} size="md" />
							<div>
								<CardTitle>{profile.name}</CardTitle>
								<CardDescription>
									{profile.wishlistCount} regalos en su bota
								</CardDescription>
							</div>
						</CardHeader>
						<CardFooter>
							<Link href={`/profile/${profile.id}`} passHref>
								<Button className="w-full sm:w-auto">
									<Gift className="mr-2 h-4 w-4" />
									Ver regalos
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
				<Card>
					<CardHeader>
						<CardTitle>Añadir nuevo perfil</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center h-24">
						<Link href="/new-profile" passHref>
							<Button variant="outline" size="lg" className="w-full sm:w-auto">
								<PlusCircle className="mr-2 h-6 w-6" />
								Añadir perfil
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
