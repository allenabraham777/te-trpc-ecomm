import clsx from 'clsx';
import React from 'react';

const Button = ({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={clsx(
                'rounded-md bg-black p-3 text-base uppercase text-white',
                className,
            )}
        />
    );
};

export default Button;
