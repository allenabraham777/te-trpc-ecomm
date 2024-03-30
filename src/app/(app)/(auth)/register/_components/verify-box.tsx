import Button from '@/components/atoms/button';
import OtpInput from '@/components/molecules/otp-input';
import React, { useCallback, useState } from 'react';

type Props = {
    email: string;
    onSubmit: (otp: string) => void;
};

const VerifyBox = ({ email, onSubmit }: Props) => {
    const [otp, setOtp] = useState('');
    const onOtpChange = useCallback((otp: string) => {
        setOtp(otp);
    }, []);
    const handleSubmit = useCallback(() => {
        onSubmit(otp);
    }, [otp]);
    return (
        <div className="flex flex-col gap-6">
            <h1 className="w-full text-center text-[2rem] font-semibold">
                Verify your email
            </h1>
            <div className="text-center text-base">
                Enter the 8 digit code you have received on{' '}
                <b className="font-medium">{email}</b>
            </div>
            <OtpInput label="Code" onChange={onOtpChange} />
            <div className="w-full pb-4 pt-8">
                <Button className="w-full" onClick={handleSubmit}>
                    VERIFY
                </Button>
            </div>
        </div>
    );
};

export default VerifyBox;
