import clsx from 'clsx';
import React from 'react';

import LoaderIcon from '@/components/icons/loading.svg';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const Button = ({ className, children, loading, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={clsx(
                'cursor-pointer rounded-md bg-black p-3 text-center text-base uppercase text-white',
                className,
            )}
        >
            {loading ? (
                <LoaderIcon className="mx-auto h-6 w-auto animate-spin stroke-white" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
