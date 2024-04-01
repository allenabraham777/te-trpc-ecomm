import React from 'react';
import Check from '@/components/icons/check.svg';

export interface CheckboxProps {
    checked?: boolean;
    label?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Checkbox = ({ checked, label, onClick }: CheckboxProps) => {
    return (
        <div className="relative flex items-center gap-2">
            <input
                type="checkbox"
                className="peer h-6 w-6 cursor-pointer appearance-none rounded bg-checkbox outline-none ring-black ring-offset-2 checked:bg-black focus:ring-2 disabled:bg-border"
                checked={checked}
                onClick={onClick}
            />
            {label && <label>{label}</label>}
            <span className="pointer-events-none absolute left-1 hidden peer-checked:block">
                <Check />
            </span>
        </div>
    );
};

export default Checkbox;
