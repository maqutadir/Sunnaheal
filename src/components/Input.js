// src/components/Input.js
import React from 'react';

const Input = ({ className, type, icon, ...props }) => (
    <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input
            type={type}
            className={`flex h-11 w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm ring-offset-beige-50 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm ${icon ? 'pl-10' : ''} ${className}`}
            {...props}
        />
    </div>
);
export default Input;
