import React from 'react';
import Header from './_components/header';

type AppLayoutProps = {
    children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="flex h-full flex-col">
            <Header />
            <section className="flex-1 px-12 pt-12">{children}</section>
        </div>
    );
};

export default AppLayout;
