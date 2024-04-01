'use client';
import clsx from 'clsx';
import React, { forwardRef, useCallback, useState } from 'react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = 'text', className, ...props }, ref) => {
        const [localType, setLocalType] = useState(type);
        const switchType = useCallback(() => {
            setLocalType((type) => (type === 'password' ? 'text' : 'password'));
        }, []);
        return (
            <div className="relative flex flex-col gap-2">
                {label && <label className="text-base">{label}</label>}
                <input
                    ref={ref}
                    type={localType}
                    className={clsx(
                        'border-1 rounded-md border border-border p-3 text-base',
                        { 'pr-16': type === 'password' },
                        className,
                    )}
                    {...props}
                />
                {type === 'password' && (
                    <h3
                        onClick={switchType}
                        className="absolute bottom-3 right-3 cursor-pointer underline underline-offset-2"
                    >
                        {localType === 'password' ? 'Show' : 'Hide'}
                    </h3>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
