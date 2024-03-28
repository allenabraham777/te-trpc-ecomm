import Button from '@/app/_components/atoms/button';
import Input from '@/app/_components/atoms/input';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
        <div className="flex flex-col gap-6 py-8 px-14">
            <h1 className="w-full text-center text-[2rem] font-semibold">
                Create your account
            </h1>
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" placeholder="user@example.com" />
            <Input label="Password" type="password" placeholder="Password" />
            <div className='w-full py-4'>
                <Button className="w-full">CREATE ACCOUNT</Button>
            </div>
            <div className="flex items-center justify-center gap-3 pb-20">
                <h3 className="text-base text-alternative font-normal">Have an Account?</h3>
                <Link href="/login" className="uppercase font-medium">LOGIN</Link>
            </div>
        </div>
    );
};

export default LoginPage;
