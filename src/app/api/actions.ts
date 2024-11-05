'use server'
import prisma from "@/libs/prisma"

export async function createProfile(name: string) {
    try {
        const newProfile = await prisma.profile.create({
            data: {
                name: name,
            },
        })
        return { success: true, profile: newProfile }
    } catch (error) {
        console.error('Failed to create profile:', error)
        return { success: false, error: 'Failed to create profile' }
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

export async function addWishlistItem(profileId: number, name: string, url: string) {
    try {
        const newItem = await prisma.wishlistItem.create({
            data: {
                name: name,
                url: url,
                profileId: profileId,
            },
        })
        return { success: true, item: newItem }
    } catch (error) {
        console.error('Failed to add wishlist item:', error)
        return { success: false, error: 'Failed to add wishlist item' }
    }
}