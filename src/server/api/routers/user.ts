import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@/server/api/trpc';
import { cookies } from 'next/headers';

export const userRouter = createTRPCRouter({
    register: publicProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string(),
                password: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { name, email, password } = input;
            try {
                const existingUser = await ctx.db.user.findFirst({
                    where: { email },
                });
                if (existingUser) {
                    throw new Error('Email already exists');
                }
                const otp = '12345678'; // TODO: Generate random otp
                const hashedOtp = await bcrypt.hash(otp, 10);
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await ctx.db.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                        otp: hashedOtp,
                    },
                });
                // TODO: Send email
                return {
                    message:
                        'Registration successful. Please check your email for OTP.',
                    email: user.email,
                    name: user.name,
                    id: user.id,
                };
            } catch (error) {
                console.error('Error registering user:', error);
                throw error;
            }
        }),
    verifyEmail: publicProcedure
        .input(z.object({ email: z.string(), otp: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { email, otp } = input;
            try {
                const user = await ctx.db.user.findFirst({
                    where: { email, verified: false },
                });
                if (!user?.otp) {
                    throw new Error('Invalid email or otp');
                }
                const isValidOtp = await bcrypt.compare(otp, user.otp);
                if (!isValidOtp) {
                    throw new Error('Invalid email or otp');
                }
                await ctx.db.user.update({
                    where: { email },
                    data: {
                        verified: true,
                        otp: null,
                    },
                });
                return { message: 'Email verified successfully' };
            } catch (error) {
                console.error('Error verifying the user: ', error);
                throw error;
            }
        }),
    login: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { email, password } = input;
            try {
                const user = await ctx.db.user.findFirst({ where: { email } });
                if (!user) {
                    throw new Error('invalid email or password');
                }
                if (!user.verified) {
                    return {
                        message: 'Login failed',
                        verified: false,
                        token: null,
                    };
                }
                const isValidPassword = await bcrypt.compare(
                    password,
                    user.password,
                );
                if (!isValidPassword) {
                    throw new Error('invalid email or password');
                }
                const secret = process.env.JWT_SECRET!;
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    secret,
                );
                const cookieOptions = {
                    httpOnly: true,
                    path: '/',
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60,
                };

                cookies().set('token', token, cookieOptions);
                return { message: 'Login successful', verified: true, token };
            } catch (error) {
                console.error('Error logging in user');
                throw error;
            }
        }),
    logoutUser: publicProcedure.mutation(async () => {
        cookies().delete('token');
        return { message: 'Logout successful' };
    }),
    getUserDetails: protectedProcedure.query(async ({ ctx }) => {
        const user = (await ctx.db.user.findUnique({
            where: { id: ctx.user!.id },
        }))!;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }),
});
