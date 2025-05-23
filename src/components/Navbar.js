// src/components/Navbar.js
import React, { useState } from 'react';
import Button from './Button';
import Icon from './Icon';
import SunnaHealLogo from './SunnaHealLogo';

const Navbar = ({ currentPage, setCurrentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navLinks = [
        { name: 'Home', page: 'home', icon: <Icon name="Home" className="h-5 w-5" /> },
        { name: 'Explorer', page: 'explorer', icon: <Icon name="Search" className="h-5 w-5" /> },
        { name: 'All Ingredients', page: 'ingredientsList', icon: <Icon name="Leaf" className="h-5 w-5" /> },
        { name: 'All Illnesses', page: 'illnessesList', icon: <Icon name="Pill" className="h-5 w-5" /> },
    ];

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false); 
    };
    return (
        <nav className="bg-beige-50/80 backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300 border-b border-yellow-600/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home');}} className="flex items-center text-3xl font-bold text-yellow-700 hover:text-yellow-600 transition-colors">
                        <SunnaHealLogo className="h-9 w-9 mr-2" />
                        <span className="tracking-tight">SunnaHeal</span>
                    </a>
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant={currentPage === link.page ? 'default' : 'ghost'}
                                onClick={() => handleNavClick(link.page)}
                                className={`font-medium text-xs lg:text-sm ${currentPage === link.page ? 'bg-amber-500 text-slate-900' : 'text-yellow-700 hover:text-yellow-600 hover:bg-amber-100'}`}
                                iconLeft={link.icon}
                            >
                                {link.name}
                            </Button>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost" size="icon" className="text-yellow-700 hover:text-yellow-600">
                            {isMobileMenuOpen ? <Icon name="X" className="h-7 w-7" /> : <Icon name="Menu" className="h-7 w-7" />}
                        </Button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-yellow-200 bg-beige-50 shadow-lg">
                    <div className="px-3 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant={currentPage === link.page ? 'default' : 'ghost'}
                                onClick={() => handleNavClick(link.page)}
                                className={`w-full justify-start text-base ${currentPage === link.page ? 'bg-amber-500 text-slate-900' : 'text-yellow-700 hover:text-yellow-600 hover:bg-amber-100'}`}
                                iconLeft={link.icon}
                            >
                                {link.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
export default Navbar;
