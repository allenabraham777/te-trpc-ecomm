import React from 'react';

type ProtectedLayoutProps = {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return <div className="h-full">{children}</div>;
};

export default ProtectedLayout;
