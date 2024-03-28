import React from 'react';
import Header from './_components/Header';

type AppLayoutProps = {
    children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="flex h-full flex-col">
            <Header />
            <section className="flex-1 p-12">{children}</section>
        </div>
    );
};

export default AppLayout;
