import { z } from 'zod';
import * as bcrypt from 'bcrypt';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

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
                await ctx.db.user.create({
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
                if (!user || !user.otp) {
                    throw new Error('Invalid email or otp');
                }
                const isValidOtp = bcrypt.compare(otp, user.otp);
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
        .query(async ({ ctx, input }) => {
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
                const isValidPassword = bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error('invalid email or password');
                }
                const token = 'abcd'; //TODO: Generate token
                return { message: 'Login successful', verified: true, token };
            } catch (error) {
                console.error('Error logging in user');
            }
        }),
});
