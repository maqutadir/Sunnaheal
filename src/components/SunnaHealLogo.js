// src/components/SunnaHealLogo.js
import React from 'react';

const SunnaHealLogo = ({ className }) => ( 
    <svg width="36" height="36" viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="goldLeafGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} /> 
                <stop offset="100%" style={{stopColor: '#B8860B', stopOpacity: 1}} /> 
            </linearGradient>
             <filter id="goldDropShadowMain" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>
                <feOffset dx="1.5" dy="1.5" result="offsetblur"/>
                <feFlood floodColor="#4A3B00" floodOpacity="0.3"/> 
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path 
            d="M 50 5 Q 15 15, 15 50 T 50 95 Q 85 50, 85 15 T 50 5 Z"
            fill="url(#goldLeafGradientMain)"
            stroke="#FFF8DC" 
            strokeWidth="2"
            filter="url(#goldDropShadowMain)"
        />
        <text x="50" y="65" fontFamily="Georgia, serif" fontSize="50" fill="#FFF8DC" textAnchor="middle" fontWeight="bold" >S</text>
    </svg>
);
export default SunnaHealLogo;
