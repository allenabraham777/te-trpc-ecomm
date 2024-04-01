import React from 'react';

type CategoriesLayoutProps = {
    children: React.ReactNode;
};

const CategoriesLayout = ({ children }: CategoriesLayoutProps) => {
    return (
        <div className="border-1 mx-auto max-w-xl rounded-[1.25rem] border px-14 py-8">
            {children}
        </div>
    );
};

export default CategoriesLayout;
