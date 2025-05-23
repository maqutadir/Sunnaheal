// src/components/Card.js
import React from 'react';

export const Card = ({ children, className = '', onClick }) => ( <div className={`bg-white rounded-xl border border-yellow-600/20 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${className}`} onClick={onClick} > {children} </div> );
export const CardHeader = ({ children, className }) => ( <div className={`p-6 ${className}`}> {children} </div> );
export const CardTitle = ({ children, className }) => ( <h3 className={`text-xl font-semibold text-yellow-700 group-hover:text-yellow-600 transition-colors ${className}`}> {children} </h3> );
export const CardDescription = ({ children, className }) => ( <p className={`text-sm text-stone-600 group-hover:text-stone-700 transition-colors ${className}`}> {children} </p> );
export const CardContent = ({ children, className }) => ( <div className={`p-6 pt-0 ${className}`}> {children} </div> );
export const CardFooter = ({ children, className }) => ( <div className={`flex items-center p-6 pt-4 bg-beige-50/50 border-t border-yellow-600/20 ${className}`}> {children} </div> );
