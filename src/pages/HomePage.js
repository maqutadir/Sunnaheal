// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient.js'; // Adjusted path
import Icon from '../components/Icon';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import SunnaHealLogo from '../components/SunnaHealLogo';
import StatusDisplay from '../components/StatusDisplay';

const HomePage = ({ setCurrentPage }) => {
    const [hadeesOfTheDay, setHadeesOfTheDay] = useState(null);
    const [ingredientOfTheDay, setIngredientOfTheDay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const heroImageUrl = "/images/Gemini_Generated_Image_wijc2swijc2swijc.png"; 

    useEffect(() => {
        const fetchDailyData = async () => {
            if (!supabase) { 
                setError({ message: "Supabase not configured. Using placeholder data." });
                setHadeesOfTheDay({ title: "Configure Supabase", text_english_translation: "Please set up your Supabase credentials to load live data.", reference_book: "App Setup" });
                setIngredientOfTheDay({ name_english: "Sample Ingredient", benefits_tibbenabawi: "Benefits will load from Supabase once configured." });
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const [hadeesRes, ingredientsRes] = await Promise.all([
                    supabase.from('hadees').select('hadees_id, title, text_english_translation, reference_book, reference_details').limit(10), 
                    supabase.from('ingredients').select('ingredient_id, name_english, benefits_tibbenabawi').limit(10)
                ]);

                if (hadeesRes.error) throw hadeesRes.error;
                if (ingredientsRes.error) throw ingredientsRes.error;

                if (hadeesRes.data && hadeesRes.data.length > 0) {
                    setHadeesOfTheDay(hadeesRes.data[Math.floor(Math.random() * hadeesRes.data.length)]);
                }
                if (ingredientsRes.data && ingredientsRes.data.length > 0) {
                    setIngredientOfTheDay(ingredientsRes.data[Math.floor(Math.random() * ingredientsRes.data.length)]);
                }
            } catch (err) {
                console.error("Error fetching daily data:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDailyData();
    }, []);

    return (
    <div className="min-h-screen bg-beige-100 text-stone-800">
        <section 
            className="relative py-20 md:py-32 text-white overflow-hidden bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImageUrl}')` }}
        >
            <div className="absolute inset-0 bg-black/70 "></div> 
            <div className="container mx-auto px-6 text-center relative z-10">
                <SunnaHealLogo className="h-16 w-16 md:h-20 md:w-20 text-amber-400 mx-auto mb-6 md:mb-8 animate-pulse" />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight tracking-tight text-white" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.7)'}}>
                    SunnaHeal: Healing through Sunnah
                </h1>
                <p className="text-md sm:text-lg md:text-xl text-beige-100 mb-8 md:mb-12 max-w-2xl mx-auto font-light" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
                    Embrace a holistic path to well-being through the sacred medical teachings of the Prophet Muhammad ﷺ.
                </p>
                
                <StatusDisplay isLoading={isLoading && !hadeesOfTheDay && !ingredientOfTheDay} error={error} dataType="daily highlights" />

                {(!isLoading && (hadeesOfTheDay || ingredientOfTheDay)) && (
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8 mb-10 md:mb-12">
                        {hadeesOfTheDay && (
                            <Card className="group !bg-black/40 backdrop-blur-sm !border-amber-500/50 text-left transform hover:scale-[1.02] transition-transform duration-300">
                                 <CardHeader className="!text-white">
                                    <div className="flex items-center">
                                        <Icon name="BookOpen" className="h-7 w-7 mr-3 text-amber-400" />
                                        <CardTitle className="text-xl !text-amber-400">Hadees of the Day</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <h3 className="text-lg font-semibold text-beige-100 mb-1">{hadeesOfTheDay.title || "Guidance from the Prophet ﷺ"}</h3>
                                    <blockquote className="text-sm text-beige-200 italic mb-2">
                                       "{hadeesOfTheDay.text_english_translation ? hadeesOfTheDay.text_english_translation.substring(0, 120) + (hadeesOfTheDay.text_english_translation.length > 120 ? "..." : "") : "Details loading..."}"
                                    </blockquote>
                                    {hadeesOfTheDay.reference_book && <p className="text-right text-xs text-amber-300 mt-2 font-medium">- {hadeesOfTheDay.reference_book} {hadeesOfTheDay.reference_details}</p>}
                                </CardContent>
                            </Card>
                        )}
                        {ingredientOfTheDay && (
                             <Card className="group !bg-black/40 backdrop-blur-sm !border-amber-500/50 text-left transform hover:scale-[1.02] transition-transform duration-300">
                                <CardHeader className="!text-white">
                                     <div className="flex items-center">
                                        <Icon name={"Leaf"} className="h-7 w-7 mr-3 text-amber-400" />
                                        <CardTitle className="text-xl !text-amber-400">Ingredient Spotlight</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <h4 className="text-lg font-semibold text-beige-100 mb-1">{ingredientOfTheDay.name_english || "Ingredient loading..."}</h4>
                                    {ingredientOfTheDay.benefits_tibbenabawi && <p className="text-beige-200 text-sm">{ingredientOfTheDay.benefits_tibbenabawi.substring(0, 120) + "..."}</p>}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button size="lg" onClick={() => setCurrentPage('explorer')} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105">
                        <Icon name="Search" className="mr-2 h-6 w-6" /> Explore Remedies
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-beige-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-700 mb-16">Discover the Essence of SunnaHeal</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Divine Guidance", description: "Health principles rooted in Quran and Sunnah.", iconName: "BookOpen", color: "text-sky-600" },
                        { title: "Natural Healing", description: "Emphasis on herbs, honey, and wholesome foods.", iconName: "Leaf", color: "text-green-600" },
                        { title: "Holistic Approach", description: "Balancing spiritual, mental, and physical health.", iconName: "HeartPulse", color: "text-red-600" }
                    ].map(item => (
                        <Card key={item.title} className="group text-center transform hover:-translate-y-2 !border-yellow-600/30 hover:!border-yellow-500">
                            <CardHeader className="flex-col items-center">
                                <div className={`p-4 bg-yellow-50 group-hover:bg-amber-100 rounded-full transition-colors mb-4`}>
                                    <Icon name={item.iconName} className={`h-10 w-10 ${item.color} transition-colors`} />
                                </div>
                                <CardTitle className="!text-yellow-700 group-hover:!text-yellow-600">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={`text-sm text-stone-600 group-hover:text-stone-700 transition-colors`}>{item.description}</p> {/* Used p directly instead of CardDescription for simplicity here */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    </div>
    );
};
export default HomePage;
