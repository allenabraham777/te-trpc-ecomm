'use client';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import { api } from '@/trpc/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef } from 'react';

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const loginUserApi = api.user.login.useMutation({
        onSuccess(data) {
            if (data.token) {
                router.push('/');
            }
        },
    });
    const handleSubmit = useCallback(() => {
        if (!emailRef.current || !passwordRef.current) return;
        loginUserApi.mutate({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });
    }, [emailRef, passwordRef, loginUserApi]);
    return (
        <div className="flex flex-col gap-6">
            <h1 className="w-full text-center text-[2rem] font-semibold">
                Login
            </h1>
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-2xl font-medium">
                    Welcome back to ECOMMERCE
                </h2>
                <h3 className="text-base font-normal">
                    The next gen business marketplace
                </h3>
            </div>
            <Input
                label="Email"
                placeholder="user@example.com"
                ref={emailRef}
            />
            <Input
                label="Password"
                type="password"
                placeholder="Password"
                ref={passwordRef}
            />
            <div className="w-full pt-4" onClick={handleSubmit}>
                <Button className="w-full">LOGIN</Button>
            </div>
            <div className="border-1 flex items-center justify-center gap-3 border-t border-border pb-4 pt-4">
                <h3 className="text-base font-normal text-alternative">
                    Don&lsquo;t have an Account?
                </h3>
                <Link href="/register" className="font-medium uppercase">
                    SIGN UP
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
