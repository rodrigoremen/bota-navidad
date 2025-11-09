'use server'
import prisma from "@/libs/prisma"
import { revalidatePath } from "next/cache"

export async function createProfile(name: string, password: string) {
    try {
        const newProfile = await prisma.profile.create({
            data: {
                name: name,
                password: password,
            },
        })
        // Revalidar la página principal para que se actualice la lista de perfiles
        revalidatePath('/')
        return { success: true, profile: newProfile }
    } catch (error) {
        console.error('Failed to create profile:', error)
        return { success: false, error: 'Failed to create profile' }
    }
}

export async function updateProfile(id: number, data: {
    name?: string;
    password?: string;
    fotoPerfil?: string;
    colorFavorito?: string;
    tallaPlayera?: string;
    tallaPantalon?: string;
    tallaTenis?: string;
    pasatiempos?: string;
    comidaFavorita?: string;
    notas?: string;
}) {
    try {
        const updatedProfile = await prisma.profile.update({
            where: { id },
            data: data,
        })
        // Revalidar ambas rutas: la lista de perfiles y la página del perfil específico
        revalidatePath('/')
        revalidatePath(`/profile/${id}`)
        return { success: true, profile: updatedProfile }
    } catch (error) {
        console.error('Failed to update profile:', error)
        return { success: false, error: 'Failed to update profile' }
    }
}

export async function verifyPassword(id: number, password: string) {
    try {
        const profile = await prisma.profile.findUnique({
            where: { id },
            select: { password: true }
        })
        return profile?.password === password
    } catch (error) {
        console.error('Failed to verify password:', error)
        return false
    }
}

export async function getProfiles() {
    try {
        const profiles = await prisma.profile.findMany({
            include: {
                _count: {
                    select: { wishlist: true }
                }
            }
        })
        return profiles.map(profile => ({
            id: profile.id,
            name: profile.name,
            fotoPerfil: profile.fotoPerfil,
            wishlistCount: profile._count.wishlist
        }))
    } catch (error) {
        console.error('Failed to fetch profiles:', error)
        return []
    }
}

export async function getProfile(id: number) {
    try {
        const profile = await prisma.profile.findUnique({
            where: { id: id },
            include: {
                wishlist: true
            }
        })
        return profile
    } catch (error) {
        console.error('Failed to fetch profile:', error)
        return null
    }
}

export async function addWishlistItem(profileId: number, name: string, url: string, image?: string, description?: string, price?: number | null, category?: string, priority?: string) {
    try {
        const newItem = await prisma.wishlistItem.create({
            data: {
                name: name,
                url: url,
                image: image || null,
                description: description || null,
                price: price || null,
                category: category || null,
                priority: priority || 'Media',
                profileId: profileId,
            },
        })
        // Revalidar la página del perfil para mostrar el nuevo item
        revalidatePath(`/profile/${profileId}`)
        revalidatePath('/')
        return { success: true, item: newItem }
    } catch (error) {
        console.error('Failed to add wishlist item:', error)
        return { success: false, error: 'Failed to add wishlist item' }
    }
}

export async function fetchImageFromUrl(url: string) {
    try {
        // Validar que sea una URL válida
        try {
            new URL(url);
        } catch {
            return { success: false, error: 'URL no válida' };
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`Fetch failed with status ${response.status}`);
            return { success: false, error: 'No se pudo acceder al enlace' };
        }

        const html = await response.text();
        
        // Buscar Open Graph image (og:image) - funciona con la mayoría de sitios
        const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
        if (ogImageMatch && ogImageMatch[1]) {
            const imageUrl = ogImageMatch[1];
            console.log('✅ Imagen encontrada (og:image):', imageUrl);
            return { success: true, imageUrl };
        }

        // Buscar Twitter Card image
        const twitterImageMatch = html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i);
        if (twitterImageMatch && twitterImageMatch[1]) {
            const imageUrl = twitterImageMatch[1];
            console.log('✅ Imagen encontrada (twitter:image):', imageUrl);
            return { success: true, imageUrl };
        }

        // Buscar primera imagen en Amazon (específico para Amazon)
        if (url.includes('amazon')) {
            const amazonImageMatch = html.match(/"hiRes":"([^"]+)"/);
            if (amazonImageMatch && amazonImageMatch[1]) {
                const imageUrl = amazonImageMatch[1];
                console.log('✅ Imagen encontrada (Amazon hiRes):', imageUrl);
                return { success: true, imageUrl };
            }
            
            const amazonImageMatch2 = html.match(/"large":"([^"]+)"/);
            if (amazonImageMatch2 && amazonImageMatch2[1]) {
                const imageUrl = amazonImageMatch2[1];
                console.log('✅ Imagen encontrada (Amazon large):', imageUrl);
                return { success: true, imageUrl };
            }

            // Intentar extraer de data-a-image-index-map
            const dataImageMatch = html.match(/"images":?"?\[?"?(?:"([^"]+)"|'([^']+)')/);
            if (dataImageMatch && (dataImageMatch[1] || dataImageMatch[2])) {
                const imageUrl = dataImageMatch[1] || dataImageMatch[2];
                console.log('✅ Imagen encontrada (Amazon images array):', imageUrl);
                return { success: true, imageUrl };
            }
        }

        // Buscar cualquier imagen en el meta
        const imageMatch = html.match(/<meta\s+name="image"\s+content="([^"]+)"/i);
        if (imageMatch && imageMatch[1]) {
            const imageUrl = imageMatch[1];
            console.log('✅ Imagen encontrada (meta name=image):', imageUrl);
            return { success: true, imageUrl };
        }

        console.warn('⚠️ No se encontró imagen en:', url);
        return { success: false, error: 'No se encontró imagen en el enlace' };
    } catch (error) {
        console.error('❌ Error al extraer imagen:', error);
        
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return { success: false, error: 'Error de conexión al acceder al enlace' };
        }
        
        return { success: false, error: 'Error al procesar el enlace' };
    }
}