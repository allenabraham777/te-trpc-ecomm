'use client';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const router = useRouter();
    const { data, isFetched } = api.user.getUserDetails.useQuery();
    if (isFetched && data?.id) {
        router.push('/');
    }
    return (
        <div className="border-1 mx-auto max-w-xl rounded-[1.25rem] border px-14 py-8">
            {children}
        </div>
    );
};

export default AuthLayout;
