// src/components/Button.js
import React from 'react';
import Icon from './Icon'; // Assuming Icon.js is in the same folder

const Button = ({ children, variant = 'default', size = 'default', className, iconLeft, iconRight, isLoading = false, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-beige-50 transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 shadow-sm hover:shadow-md";
    const variantStyles = {
        default: "bg-amber-500 text-slate-900 hover:bg-amber-600", 
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700",
        secondary: "bg-beige-200 text-amber-700 hover:bg-beige-300", 
        ghost: "hover:bg-amber-100 text-amber-600 hover:text-amber-700 shadow-none",
        link: "text-amber-600 underline-offset-4 hover:underline shadow-none",
    };
    const sizeStyles = {
        default: "h-11 px-6 py-2.5",
        sm: "h-10 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-11 w-11",
    };
    return (
        <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} disabled={isLoading} {...props}>
            {isLoading && <Icon name="Loader" className="mr-2 h-5 w-5" />}
            {!isLoading && iconLeft && <span className="mr-2 -ml-1">{iconLeft}</span>}
            {children}
            {!isLoading && iconRight && <span className="ml-2 -mr-1">{iconRight}</span>}
        </button>
    );
};
export default Button;
