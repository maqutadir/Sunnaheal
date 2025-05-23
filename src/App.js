// src/App.js
import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
import IngredientsListPage from './pages/IngredientsListPage';
import IllnessesListPage from './pages/IllnessesListPage';
import HadeesDetailPage from './pages/HadeesDetailPage';
import IngredientDetailPage from './pages/IngredientDetailPage';
import IllnessDetailPage from './pages/IllnessDetailPage';
import StatusDisplay from './components/StatusDisplay';
import Button from './components/Button.js'; // For the fallback UI

function App() {
    const [currentPage, setCurrentPage] = useState('home'); 
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);

    const navigateToDetail = (item) => {
        setSelectedItemDetails(item);
        if (!item || !item.type) {
            console.warn("Attempted to navigate to detail page with invalid item:", item);
            setCurrentPage('explorer'); 
            return;
        }

        if (item.type === 'Hadees') setCurrentPage('hadeesDetail');
        else if (item.type === 'Ingredient') setCurrentPage('ingredientDetail');
        else if (item.type === 'Illness') setCurrentPage('illnessDetail');
        else {
            console.warn("Unknown item type for detail navigation:", item.type);
            setCurrentPage('explorer'); 
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage, selectedItemDetails]);

    const renderPage = () => {
        if (!supabase && currentPage !== 'home') { 
             return (
                <div className="container mx-auto p-8 text-center">
                    <StatusDisplay 
                        error={{ message: "Supabase is not configured. Please set YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY in the code."}} 
                        dataType="application data" 
                    />
                     <Button onClick={() => setCurrentPage('home')} variant="default" className="mt-6">Go to Home</Button>
                </div>
            );
        }

        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'explorer':
                return <ExplorerPage navigateToDetail={navigateToDetail} />;
            case 'ingredientsList': 
                return <IngredientsListPage navigateToDetail={navigateToDetail} />;
            case 'illnessesList': 
                return <IllnessesListPage navigateToDetail={navigateToDetail} />;
            case 'hadeesDetail':
                return selectedItemDetails && selectedItemDetails.type === 'Hadees' 
                    ? <HadeesDetailPage item={selectedItemDetails} setCurrentPage={setCurrentPage} /> 
                    : <ExplorerPage navigateToDetail={navigateToDetail} />; 
            case 'ingredientDetail':
                return selectedItemDetails && selectedItemDetails.type === 'Ingredient'
                    ? <IngredientDetailPage item={selectedItemDetails} setCurrentPage={setCurrentPage} />
                    : <ExplorerPage navigateToDetail={navigateToDetail} />; 
            case 'illnessDetail':
                return selectedItemDetails && selectedItemDetails.type === 'Illness'
                    ? <IllnessDetailPage item={selectedItemDetails} setCurrentPage={setCurrentPage} />
                    : <ExplorerPage navigateToDetail={navigateToDetail} />; 
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-beige-100 text-stone-800 antialiased font-serif">
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-grow transition-opacity duration-500 ease-in-out">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}
export default App;
