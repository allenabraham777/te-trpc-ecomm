import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';
import React from 'react';

type ProtectedLayoutProps = {
    children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    try {
        await api.user.getUserDetails();
    } catch (error: unknown) {
        console.error(error);
        redirect('/login');
    }
    return <div className="h-full">{children}</div>;
};

export default ProtectedLayout;
