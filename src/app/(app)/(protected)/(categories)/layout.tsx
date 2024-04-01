import { log } from 'console';
import React from 'react';
import { cookies } from 'next/headers';

type CategoriesLayoutProps = {
    children: React.ReactNode;
};

const CategoriesLayout = ({ children, ...props }: CategoriesLayoutProps) => {
    return (
        <div className="border-1 mx-auto max-w-xl rounded-[1.25rem] border px-14 py-8">
            {children}
        </div>
    );
};

export default CategoriesLayout;
