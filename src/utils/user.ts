'use server';

import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';

export const getUser = async ({
    shouldRedirect = true,
}: { shouldRedirect?: boolean } = {}) => {
    try {
        return await api.user.getUserDetails();
    } catch (error: unknown) {
        if (
            (error as { code: string })?.code === 'UNAUTHORIZED' &&
            shouldRedirect
        ) {
            redirect('/login');
        }
        return null;
    }
};
