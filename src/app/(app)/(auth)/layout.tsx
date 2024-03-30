import React from 'react';

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="border-1 mx-auto max-w-xl rounded-[1.25rem] border px-14 py-8">
            {children}
        </div>
    );
};

export default AuthLayout;
