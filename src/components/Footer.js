// src/components/Footer.js
import React from 'react';
import SunnaHealLogo from './SunnaHealLogo';

const Footer = () => (
    <footer className="bg-stone-800 text-beige-200 py-10 border-t-4 border-amber-500">
        <div className="container mx-auto px-6 text-center">
            <div className="mb-4">
                <SunnaHealLogo className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <p className="text-xl font-semibold text-beige-100">SunnaHeal</p>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} SunnaHeal Project. All Rights Reserved.</p>
            <p className="text-xs mt-3">Based on the works of Dr. Mohammed Shakeel Shamsi.</p>
            <p className="text-xs mt-1">This platform is for educational purposes and does not constitute medical advice. Always consult a qualified healthcare professional for health concerns.</p>
        </div>
    </footer>
);
export default Footer;
