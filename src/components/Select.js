// src/components/Select.js
import React from 'react';
import Icon from './Icon'; // Assuming Icon.js is in the same folder

const Select = ({ children, className, ...props }) => (
    <div className="relative">
        <select
            className={`h-11 w-full appearance-none rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm ring-offset-beige-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm ${className}`}
            {...props}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-700">
            <Icon name="ChevronDown" className="h-5 w-5" />
        </div>
    </div>
);
export default Select;
