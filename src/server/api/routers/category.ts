import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const categoryRouter = createTRPCRouter({
    getAllCategories: protectedProcedure
        .input(
            z.object({
                skip: z.number().optional(),
                page: z.number().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            try {
                const { skip, page } = input;
                let payload: { skip: number; take: number } | undefined =
                    undefined;
                if (page && skip !== undefined && skip > -1) {
                    payload = { skip, take: page };
                }
                const categories = await ctx.db.$transaction([
                    ctx.db.category.count(),
                    ctx.db.category.findMany(payload),
                ]);
                return {
                    message: 'Categories',
                    categories: categories[1],
                    total: categories[0],
                };
            } catch (error) {
                console.error(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong!',
                });
            }
        }),
    getSelectedCategories: protectedProcedure.query(async ({ ctx }) => {
        try {
            const user = ctx.user!;
            const categories = await ctx.db.userCategories.findMany({
                where: { userId: user.id },
            });
            return {
                message: 'Selected Categories',
                categories,
            };
        } catch (error) {
            console.error(error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong!',
            });
        }
    }),
    selectCategory: protectedProcedure
        .input(z.object({ categoryId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const { categoryId } = input;
            const user = ctx.user!;
            try {
                const categoryExists = await ctx.db.category.findUnique({
                    where: { id: categoryId },
                });
                if (!categoryExists) {
                    throw new TRPCError({
                        message: 'No such category',
                        code: 'NOT_FOUND',
                    });
                }
                const alreadySelected = await ctx.db.userCategories.findFirst({
                    where: { userId: user.id, categoryId: categoryExists.id },
                });
                if (alreadySelected) {
                    throw new TRPCError({
                        code: 'CONFLICT',
                        message: 'Categotry already selected',
                    });
                }
                await ctx.db.userCategories.create({
                    data: {
                        userId: user.id,
                        categoryId: categoryExists.id,
                    },
                });
                return {
                    message: 'Category selected successfully',
                };
            } catch (error) {
                console.error(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong!',
                });
            }
        }),
    deselctCategory: publicProcedure
        .input(z.object({ categoryId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const { categoryId } = input;
            const user = ctx.user!;
            try {
                const categoryExists = await ctx.db.category.findUnique({
                    where: { id: categoryId },
                });
                if (!categoryExists) {
                    throw new TRPCError({
                        message: 'No such category',
                        code: 'NOT_FOUND',
                    });
                }
                const alreadySelected = await ctx.db.userCategories.findFirst({
                    where: { userId: user.id, categoryId: categoryExists.id },
                });
                if (!alreadySelected) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'No such categotry selected',
                    });
                }
                await ctx.db.userCategories.delete({
                    where: {
                        id: alreadySelected.id,
                        userId: user.id,
                        categoryId: categoryExists.id,
                    },
                });
                return {
                    message: 'Category deselected successfully',
                };
            } catch (error) {
                console.error(error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong!',
                });
            }
        }),
});
