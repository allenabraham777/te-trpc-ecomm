'use client';
import React, { useCallback, useState } from 'react';
import RegisterForm from './_components/register-form';
import VerifyBox from './_components/verify-box';
import { emailStringMasker } from '@/utils/email';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

const SCREENS = {
    REGISTER: 'REGISTER',
    VERIFY: 'VERIFY',
};

const LoginPage = () => {
    const router = useRouter();
    const [screen, setScreen] = useState(SCREENS.REGISTER);
    const [email, setEmail] = useState('');
    const [maskedEmail, setMaskedEmail] = useState('');
    const createUserApi = api.user.register.useMutation({
        onSuccess(data) {
            const { email } = data;
            const maskedEmail = emailStringMasker(email);
            setEmail(email);
            setMaskedEmail(maskedEmail);
            setScreen(SCREENS.VERIFY);
        },
    });
    const verifyOtpApi = api.user.verifyEmail.useMutation({
        onSuccess() {
            router.push('/login');
        },
    });
    const createUser = useCallback(
        async (name: string, email: string, password: string) => {
            createUserApi.mutate({ email, name, password });
        },
        [createUserApi],
    );
    const verifyOtp = useCallback(
        (otp: string) => {
            verifyOtpApi.mutate({ email, otp });
        },
        [verifyOtpApi],
    );
    switch (screen) {
        case SCREENS.REGISTER: {
            return <RegisterForm onSubmit={createUser} />;
        }
        case SCREENS.VERIFY: {
            return <VerifyBox email={maskedEmail} onSubmit={verifyOtp} />;
        }
        default: {
            return null;
        }
    }
};

export default LoginPage;
