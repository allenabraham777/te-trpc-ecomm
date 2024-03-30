'use client';
import React, { useCallback, useState } from 'react';
import RegisterForm from './_components/register-form';
import VerifyBox from './_components/verify-box';
import { emailStringMasker } from '@/utils/email';
import { useRouter } from 'next/navigation';

const SCREENS = {
    REGISTER: 'REGISTER',
    VERIFY: 'VERIFY',
};

const LoginPage = () => {
    const router = useRouter();
    const [screen, setScreen] = useState(SCREENS.REGISTER);
    const [email, setEmail] = useState('');
    const createUser = useCallback(
        (name: string, email: string, password: string) => {
            console.log(name, email, password);
            const maskedEmail = emailStringMasker(email);
            setEmail(maskedEmail);
            setScreen(SCREENS.VERIFY);
        },
        [],
    );
    const verifyOtp = useCallback((otp: string) => {
        router.push('/');
    }, []);
    switch (screen) {
        case SCREENS.REGISTER: {
            return <RegisterForm onSubmit={createUser} />;
        }
        case SCREENS.VERIFY: {
            return <VerifyBox email={email} onSubmit={verifyOtp} />;
        }
        default: {
            return null;
        }
    }
};

export default LoginPage;
