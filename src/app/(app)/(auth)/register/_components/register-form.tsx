'use client';
import React, { useCallback, useRef } from 'react';
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Link from 'next/link';

type Props = {
    onSubmit: (name: string, email: string, password: string) => void;
};

function RegisterForm({ onSubmit }: Props) {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handleSubmit = useCallback(() => {
        if (!nameRef.current || !emailRef.current || !passwordRef.current)
            return;
        onSubmit(
            nameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value,
        );
    }, [nameRef, emailRef, passwordRef]);
    return (
        <div className="flex flex-col gap-6">
            <h1 className="w-full text-center text-[2rem] font-semibold">
                Create your account
            </h1>
            <Input label="Name" placeholder="Enter your name" ref={nameRef} />
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
            <div className="w-full py-4" onClick={handleSubmit}>
                <Button className="w-full">CREATE ACCOUNT</Button>
            </div>
            <div className="flex items-center justify-center gap-3 pb-20">
                <h3 className="text-base font-normal text-alternative">
                    Have an Account?
                </h3>
                <Link href="/login" className="font-medium uppercase">
                    LOGIN
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
