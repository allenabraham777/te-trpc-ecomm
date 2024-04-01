import { type PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const deserializeUser = async (db: PrismaClient) => {
    const cookie = cookies();
    try {
        let token;
        if (cookie.get('token')) {
            token = cookie.get('token')?.value;
        }
        if (!token) {
            return null;
        }
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as {
            id: number;
            email: string;
        };
        if (!decoded) {
            return null;
        }
        const user = await db.user.findUnique({
            where: { id: decoded.id, email: decoded.email },
        });
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            email: user.email,
        };
    } catch (error: unknown) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: (error as { message: string }).message,
        });
    }
};
