// src/pages/IllnessesListPage.js
import React, { useState, useEffect } from 'react';
import { fetchAllIllnesses } from '../services/apiService'; // Adjusted path
import supabase from '../supabaseClient.js'; // Adjusted path
import Icon from '../components/Icon';
import Button from '../components/Button'; // Not used, but kept for consistency
import StatusDisplay from '../components/StatusDisplay';

const IllnessesListPage = ({ navigateToDetail }) => {
    const [illnesses, setIllnesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadIllnesses = async () => {
             if (!supabase) {
                setError({ message: "Supabase not configured. Cannot load illnesses." });
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            const { data, error: fetchError } = await fetchAllIllnesses();
            if (fetchError) {
                setError(fetchError);
            } else {
                setIllnesses(data.sort((a,b) => (a.name_english || "").localeCompare(b.name_english || "")));
            }
            setIsLoading(false);
        };
        loadIllnesses();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen bg-beige-50">
            <header className="text-center mb-12">
                <Icon name="HeartPulse" className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-4">All Illnesses & Conditions</h1>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                    Browse the complete list of illnesses discussed. Click on an item to view details.
                </p>
            </header>
             <StatusDisplay isLoading={isLoading} error={error} dataType="illnesses" />
            {!isLoading && !error && illnesses.length > 0 && (
                <div className="bg-white shadow-xl rounded-xl border border-yellow-600/30 overflow-hidden">
                    <ul className="divide-y divide-stone-200">
                        {illnesses.map(item => (
                            <li 
                                key={item.illness_id} 
                                onClick={() => navigateToDetail(item)} 
                                className="p-4 sm:p-6 hover:bg-amber-50/50 transition-colors duration-200 cursor-pointer flex items-center space-x-4"
                            >
                                <div className="p-3 bg-red-100 rounded-lg flex-shrink-0"> 
                                    <Icon name="Pill" className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="text-lg font-semibold text-yellow-700 truncate">{item.name_english}</h3>
                                    {item.name_arabic && <p className="text-sm text-stone-500 font-mono truncate">{item.name_arabic}</p>}
                                    <p className="text-xs text-stone-400 mt-1 truncate">{item.description_tibbenabawi ? item.description_tibbenabawi.substring(0,100) + "..." : "No description available."}</p>
                                </div>
                                 <Icon name="ChevronRight" className="h-5 w-5 text-stone-400 flex-shrink-0" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {!isLoading && !error && illnesses.length === 0 && (
                 <p className="text-center text-stone-500 py-10 text-lg">No illnesses found.</p>
            )}
        </div>
    );
};
export default IllnessesListPage;
