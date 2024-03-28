import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...props }: ButtonProps) => {
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
