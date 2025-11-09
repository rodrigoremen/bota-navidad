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
import { PlusCircle, Loader2 } from 'lucide-react';
import { createProfile } from '../api/actions';
import { UserAvatar } from '@/components/UserAvatar';

export default function NewProfilePage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!name.trim() || !password.trim()) {
            return;
        }

        // Prevenir múltiples clics
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const result = await createProfile(name, password);

            if (result.success) {
                router.push('/');
                router.refresh();
            } else {
                console.error('Error creating profile:', result.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen snow-effect flex items-center justify-center">
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-md mx-auto christmas-card">
                    <CardHeader className="text-center space-y-3">
                        <div className="text-6xl mb-4">🎅</div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-red-400 to-amber-300 bg-clip-text text-transparent">
                            Crea tu perfil
                        </CardTitle>
                        <p className="text-slate-400 text-sm font-light">¡Empieza tu lista de regalos!</p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <UserAvatar name={name || 'Nuevo Usuario'} size="lg" />
                                    <span className="absolute -bottom-1 -right-1 text-3xl">✨</span>
                                </div>
                                <div className="w-full space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-300 font-medium">Tu nombre</label>
                                        <Input
                                            type="text"
                                            placeholder="Ej: María, Juan..."
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white/5 border-white/10 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all text-slate-100 placeholder:text-slate-500"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-300 font-medium">Contraseña</label>
                                        <Input
                                            type="password"
                                            placeholder="Tu contraseña para editar tu perfil"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border-white/10 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all text-slate-100 placeholder:text-slate-500"
                                            required
                                        />
                                        <p className="text-xs text-slate-500">Úsala para editar tu perfil después</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/')}
                                className="w-full sm:w-auto border-slate-600/50 hover:bg-white/5 hover:border-slate-500"
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:flex-1 christmas-gradient"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creando perfil...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Crear perfil
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}