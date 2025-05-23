// src/pages/ExplorerPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { fetchExplorerData } from '../services/apiService'; // Adjusted path
import supabase from '../supabaseClient.js'; // Adjusted path
import Icon from '../components/Icon';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import StatusDisplay from '../components/StatusDisplay';

const ExplorerPage = ({ navigateToDetail }) => {
    const [allData, setAllData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState(''); 
    const [selectedIngredientCat, setSelectedIngredientCat] = useState(''); 
    const [selectedIllnessCat, setSelectedIllnessCat] = useState(''); 
    const [filteredResults, setFilteredResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAllData = async () => {
            if (!supabase) {
                 setError({ message: "Supabase not configured. Cannot load explorer data." });
                 setIsLoading(false);
                 return;
            }
            setIsLoading(true);
            setError(null);
            const data = await fetchExplorerData(); 
            if (data && data.length >= 0) { 
                setAllData(data);
                // setFilteredResults(data); // Filtering will happen in the next useEffect
            } else {
                if (supabase) { 
                    setError({ message: "No data found or an error occurred during fetching." });
                }
            }
            setIsLoading(false); 
        };
        loadAllData();
    }, []); 

    useEffect(() => {
        if (isLoading && allData.length === 0) return;

        let currentResults = [...allData];

        if (searchTerm.trim()) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            currentResults = currentResults.filter(item => {
                let match = (item.title && item.title.toLowerCase().includes(lowerSearchTerm)) || 
                            (item.name_english && item.name_english.toLowerCase().includes(lowerSearchTerm)) ||
                            (item.name_arabic && item.name_arabic.toLowerCase().includes(lowerSearchTerm));
                
                if (item.type === 'Hadees') {
                    match = match || 
                            (item.text_english_translation && item.text_english_translation.toLowerCase().includes(lowerSearchTerm)) ||
                            (item.narrator && item.narrator.toLowerCase().includes(lowerSearchTerm)) ||
                            (item.topic_tags && Array.isArray(item.topic_tags) && item.topic_tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)));
                } else if (item.type === 'Ingredient') {
                    match = match ||
                            (item.description_tibbenabawi && item.description_tibbenabawi.toLowerCase().includes(lowerSearchTerm)) ||
                            (item.benefits_tibbenabawi && item.benefits_tibbenabawi.toLowerCase().includes(lowerSearchTerm));
                } else if (item.type === 'Illness') {
                    let treatmentsText = "";
                    if (item.treatments_tibbenabawi) {
                        try {
                            const parsedTreatments = Array.isArray(item.treatments_tibbenabawi) ? item.treatments_tibbenabawi : (typeof item.treatments_tibbenabawi === 'string' ? JSON.parse(item.treatments_tibbenabawi) : []);
                            if (Array.isArray(parsedTreatments)) {
                                treatmentsText = parsedTreatments.map(t => `${t.treatment_type || ''} ${t.description_or_reference_id || ''} ${t.description || ''} ${t.instructions || ''}`).join(" ").toLowerCase();
                            }
                        } catch (e) { /* ignore parsing error for search */ }
                    }
                    match = match ||
                            (item.description_tibbenabawi && item.description_tibbenabawi.toLowerCase().includes(lowerSearchTerm)) ||
                            (item.symptoms_tibbenabawi && item.symptoms_tibbenabawi.toLowerCase().includes(lowerSearchTerm)) ||
                            (item.causes_tibbenabawi && item.causes_tibbenabawi.toLowerCase().includes(lowerSearchTerm)) ||
                            (treatmentsText.includes(lowerSearchTerm));
                }
                return match;
            });
        }
        if (selectedType) {
            currentResults = currentResults.filter(item => item.type === selectedType);
        }
        if (selectedIngredientCat && (!selectedType || selectedType === 'Ingredient')) {
             currentResults = currentResults.filter(item => item.type === 'Ingredient' && item.category === selectedIngredientCat);
        }
        if (selectedIllnessCat && (!selectedType || selectedType === 'Illness')) {
            currentResults = currentResults.filter(item => item.type === 'Illness' && item.category === selectedIllnessCat);
        }
        setFilteredResults(currentResults);
    }, [searchTerm, selectedType, selectedIngredientCat, selectedIllnessCat, allData, isLoading]);


    const handleItemClick = (item) => {
        navigateToDetail(item); 
    };
        
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedType('');
        setSelectedIngredientCat('');
        setSelectedIllnessCat('');
    };

    const getSnippet = (item) => {
        if (item.type === 'Hadees') return item.text_english_translation ? item.text_english_translation.substring(0, 100) + "..." : "No translation available.";
        if (item.type === 'Ingredient') return item.description_tibbenabawi ? item.description_tibbenabawi.substring(0, 100) + "..." : (item.benefits_tibbenabawi ? item.benefits_tibbenabawi.substring(0,100) + "..." : "No description available.");
        if (item.type === 'Illness') return item.description_tibbenabawi ? item.description_tibbenabawi.substring(0, 100) + "..." : (item.symptoms_tibbenabawi ? item.symptoms_tibbenabawi.substring(0,100) + "..." : "No description available.");
        return "No snippet available.";
    };

    const ingredientCategories = useMemo(() => {
        if (!allData) return [];
        const cats = new Set(allData.filter(item => item.type === 'Ingredient' && item.category).map(item => item.category));
        return Array.from(cats).sort();
    }, [allData]);

    const illnessCategories = useMemo(() => {
        if (!allData) return [];
        const cats = new Set(allData.filter(item => item.type === 'Illness' && item.category).map(item => item.category));
        return Array.from(cats).sort();
    }, [allData]);


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen bg-beige-50">
            <header className="text-center mb-12">
                <Icon name="Microscope" className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-4">SunnaHeal Interactive Explorer</h1>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                    Uncover Prophetic wisdom on ingredients, ailments, and Hadees related to health.
                </p>
            </header>

            <Card className="p-6 md:p-8 mb-12 !border-amber-600/30">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div className="md:col-span-2 lg:col-span-4">
                        <label htmlFor="search" className="block text-sm font-medium text-stone-700 mb-1">Search by Keyword</label>
                        <Input 
                            type="text" 
                            id="search" 
                            placeholder="e.g., Honey, Fever, Ruqyah..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Icon name="Search" className="h-5 w-5 text-stone-400" />}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="type-filter" className="block text-sm font-medium text-stone-700 mb-1">Filter by Type</label>
                        <Select id="type-filter" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="">All Types</option>
                            <option value="Hadees">Hadees</option>
                            <option value="Ingredient">Ingredient</option>
                            <option value="Illness">Illness</option>
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="ingredient-cat-filter" className="block text-sm font-medium text-stone-700 mb-1">Ingredient Category</label>
                        <Select id="ingredient-cat-filter" value={selectedIngredientCat} onChange={(e) => setSelectedIngredientCat(e.target.value)} disabled={selectedType && selectedType !== 'Ingredient'}>
                            <option value="">All Ingredients</option>
                            {ingredientCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Select>
                    </div>

                    <div>
                        <label htmlFor="illness-cat-filter" className="block text-sm font-medium text-stone-700 mb-1">Illness Category</label>
                        <Select id="illness-cat-filter" value={selectedIllnessCat} onChange={(e) => setSelectedIllnessCat(e.target.value)} disabled={selectedType && selectedType !== 'Illness'}>
                            <option value="">All Illnesses</option>
                             {illnessCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Select>
                    </div>
                     <Button onClick={clearFilters} variant="outline" className="w-full md:w-auto border-stone-400 text-stone-700 hover:bg-beige-200">
                        Clear Filters
                    </Button>
                </div>
            </Card>

            <div>
                <h2 className="text-2xl font-semibold text-yellow-700 mb-6">
                    Displaying Results ({filteredResults.length})
                </h2>
                <StatusDisplay isLoading={isLoading} error={error} dataType="explorer results" />
                
                {!isLoading && !error && filteredResults.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.map(item => (
                            <Card 
                                key={item.hadees_id || item.ingredient_id || item.illness_id} 
                                onClick={() => handleItemClick(item)} 
                                className="group cursor-pointer hover:!border-amber-500 flex flex-col"
                            >
                                <CardHeader className="flex items-center">
                                    <div className={`p-3 rounded-full mr-4 flex-shrink-0 ${
                                        item.type === 'Hadees' ? 'bg-blue-100' :
                                        item.type === 'Ingredient' ? 'bg-green-100' :
                                        'bg-red-100'
                                    }`}>
                                        <Icon 
                                            name={item.type === 'Hadees' ? 'BookOpen' : item.type === 'Ingredient' ? 'Leaf' : 'Pill'} 
                                            className={`h-7 w-7 ${
                                                item.type === 'Hadees' ? 'text-blue-600' :
                                                item.type === 'Ingredient' ? 'text-green-600' :
                                                'text-red-600'
                                            }`} 
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <CardTitle>{item.title || item.name_english}</CardTitle>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-1 inline-block ${
                                            item.type === 'Hadees' ? 'bg-blue-100 text-blue-800' :
                                            item.type === 'Ingredient' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{getSnippet(item)}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <span className="text-sm text-amber-600 group-hover:underline">View Details &rarr;</span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
                {!isLoading && !error && filteredResults.length === 0 && (
                    <p className="text-center text-stone-500 py-10 text-lg">No results found. Please try different search terms or filters.</p>
                )}
            </div>
        </div>
    );
};
export default ExplorerPage;
