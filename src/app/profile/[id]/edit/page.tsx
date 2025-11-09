'use client';

import { useState, useEffect, use } from 'react';
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
import { ChevronLeft, Save, User, Lock, Palette, Shirt, Gauge, Camera } from 'lucide-react';
import { getProfile, updateProfile, verifyPassword } from '@/app/api/actions';
import { ImageUpload } from '@/components/ImageUpload';
import Link from 'next/link';

export default function EditProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [colorFavorito, setColorFavorito] = useState('');

    // Debug: observar cambios en fotoPerfil
    useEffect(() => {
        console.log('🔄 Estado fotoPerfil cambió a:', fotoPerfil);
    }, [fotoPerfil]);
    const [tallaPlayera, setTallaPlayera] = useState('');
    const [tallaPantalon, setTallaPantalon] = useState('');
    const [tallaTenis, setTallaTenis] = useState('');
    const [pasatiempos, setPasatiempos] = useState('');
    const [comidaFavorita, setComidaFavorita] = useState('');
    const [notas, setNotas] = useState('');

    useEffect(() => {
        const load = async () => {
            const profile = await getProfile(parseInt(id));
            if (profile) {
                setName(profile.name);
                setFotoPerfil(profile.fotoPerfil || '');
                setColorFavorito(profile.colorFavorito || '');
                setTallaPlayera(profile.tallaPlayera || '');
                setTallaPantalon(profile.tallaPantalon || '');
                setTallaTenis(profile.tallaTenis || '');
                setPasatiempos(profile.pasatiempos || '');
                setComidaFavorita(profile.comidaFavorita || '');
                setNotas(profile.notas || '');
            }
        };
        load();
    }, [id]); const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await verifyPassword(parseInt(id), password);
        if (isValid) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const updateData: Record<string, string | null> = {
            name,
            fotoPerfil: fotoPerfil || null,
            colorFavorito,
            tallaPlayera,
            tallaPantalon,
            tallaTenis,
            pasatiempos,
            comidaFavorita,
            notas,
        };

        if (newPassword.trim()) {
            updateData.password = newPassword;
        }

        console.log('📸 Guardando perfil con foto:', fotoPerfil);
        const result = await updateProfile(parseInt(id), updateData);
        console.log('✅ Resultado:', result);
        if (result.success) {
            router.push(`/profile/${id}`);
            router.refresh();
        }
    }; if (!isAuthenticated) {
        return (
            <div className="min-h-screen snow-effect flex items-center justify-center">
                <div className="container mx-auto py-8 px-4">
                    <Card className="max-w-md mx-auto christmas-card">
                        <CardHeader className="text-center space-y-3">
                            <div className="text-6xl mb-2">🔒</div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
                                Verificar identidad
                            </CardTitle>
                            <p className="text-slate-400 text-sm font-light">Ingresa tu contraseña para editar tu perfil</p>
                        </CardHeader>
                        <form onSubmit={handlePasswordSubmit}>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-300 font-medium flex items-center gap-2">
                                        <Lock className="h-4 w-4 text-amber-400" />
                                        Contraseña
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="Tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all text-slate-100 placeholder:text-slate-500"
                                        required
                                    />
                                    {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <Link href={`/profile/${id}`} className="w-full sm:w-auto">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full border-slate-600/50 hover:bg-white/5 hover:border-slate-500 transition-all"
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" className="w-full sm:flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30">
                                    Verificar
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen snow-effect">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link href={`/profile/${id}`}>
                        <Button variant="ghost" className="mb-6 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-all">
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            Volver al perfil
                        </Button>
                    </Link>

                    <Card className="christmas-card">
                        <CardHeader className="text-center space-y-4">
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-red-400 to-amber-300 bg-clip-text text-transparent">
                                Editar Perfil
                            </CardTitle>
                            <p className="text-slate-400 text-sm font-light">Personaliza tu información para que todos sepan más de ti</p>
                        </CardHeader>

                        <form onSubmit={handleProfileUpdate}>
                            <CardContent className="space-y-7">
                                {/* Foto de Perfil */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2 justify-center">
                                        <Camera className="h-5 w-5" />
                                        Foto de Perfil
                                    </h3>
                                    <ImageUpload
                                        value={fotoPerfil}
                                        onChange={(url) => {
                                            console.log('🖼️ onChange llamado con URL:', url);
                                            setFotoPerfil(url);
                                        }}
                                        onRemove={() => {
                                            console.log('🗑️ Removiendo foto');
                                            setFotoPerfil('');
                                        }}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Información Básica
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Nombre</label>
                                            <Input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-green-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <Lock className="h-3 w-3" />
                                                Nueva Contraseña (opcional)
                                            </label>
                                            <Input
                                                type="password"
                                                placeholder="Dejar vacío para no cambiar"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-yellow-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                                        <Palette className="h-5 w-5" />
                                        Preferencias
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Color Favorito</label>
                                            <Input
                                                type="text"
                                                placeholder="Ej: Azul, Rojo..."
                                                value={colorFavorito}
                                                onChange={(e) => setColorFavorito(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-red-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Comida Favorita</label>
                                            <Input
                                                type="text"
                                                placeholder="Ej: Pizza, Tacos..."
                                                value={comidaFavorita}
                                                onChange={(e) => setComidaFavorita(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-red-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                                        <Shirt className="h-5 w-5" />
                                        Tallas de Ropa
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Talla Playera</label>
                                            <select
                                                value={tallaPlayera}
                                                onChange={(e) => setTallaPlayera(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL">XXL</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Talla Pantalón</label>
                                            <Input
                                                type="text"
                                                placeholder="Ej: 28, 30, 32..."
                                                value={tallaPantalon}
                                                onChange={(e) => setTallaPantalon(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Talla Tenis</label>
                                            <Input
                                                type="text"
                                                placeholder="Ej: 7, 8, 9..."
                                                value={tallaTenis}
                                                onChange={(e) => setTallaTenis(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                        <Gauge className="h-5 w-5" />
                                        Intereses y Notas
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Pasatiempos / Hobbies</label>
                                            <Input
                                                type="text"
                                                placeholder="Ej: Leer, Gaming, Cocinar..."
                                                value={pasatiempos}
                                                onChange={(e) => setPasatiempos(e.target.value)}
                                                className="bg-white/5 border-white/10 focus:border-purple-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-400">Notas adicionales</label>
                                            <textarea
                                                placeholder="Cualquier otra información que quieras compartir..."
                                                value={notas}
                                                onChange={(e) => setNotas(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:border-purple-500 focus:outline-none transition-colors min-h-[100px] resize-y"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <Link href={`/profile/${id}`} className="w-full sm:w-auto">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full border-gray-600 hover:bg-white/5"
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" className="w-full sm:flex-1 christmas-gradient shadow-lg shadow-red-500/30">
                                    <Save className="mr-2 h-4 w-4" />
                                    Guardar Cambios
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
