'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { createProfile } from '../api/actions';
import { UserAvatar } from '@/components/UserAvatar';

export default function NewProfilePage() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            await createProfile(name);
            router.push('/');
            router.refresh();
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Crea un perfil nuevo!</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <UserAvatar name={name || 'New User'} size="lg" />
                            <Input
                                type="text"
                                placeholder="Introduce tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full sm:w-auto"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/')}
                            className="w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="w-full sm:w-auto">
                            Crear perfil
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}