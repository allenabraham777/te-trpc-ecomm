import clsx from 'clsx'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = ({ className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={clsx("p-3 text-base bg-black text-white uppercase rounded-md", className)} />
    )
}

export default Button
