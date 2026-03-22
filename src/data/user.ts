import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ 
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                password: true,
                role: true,
                isTwoFactorEnabled: true,
                image: true,
            },
        });
        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ 
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                role: true,
                isTwoFactorEnabled: true,
                image: true,
            },
        });
        return user;
    } catch {
        return null;
    }
};
