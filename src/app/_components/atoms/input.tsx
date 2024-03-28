import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = ({ label, ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-base">{label}</label>}
            <input className="border border-1 border-border rounded-md p-3 text-base" {...props} />
        </div>
    )
}

export default Input
