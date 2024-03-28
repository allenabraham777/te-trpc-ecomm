import React from 'react';

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="border-1 mx-auto max-w-xl rounded-[1.25rem] border">
            {children}
        </div>
    );
};

export default AuthLayout;
