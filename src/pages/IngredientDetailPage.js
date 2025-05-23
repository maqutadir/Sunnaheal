// src/pages/IngredientDetailPage.js
import React from 'react';
import Icon from '../components/Icon';
import { Card } from '../components/Card';
import Button from '../components/Button';
import DetailPageSection from '../components/DetailPageSection';
import StatusDisplay from '../components/StatusDisplay';

const IngredientDetailPage = ({ item, setCurrentPage }) => {
    if (!item || item.type !== 'Ingredient') {
        return (
            <div className="container mx-auto p-8 text-center">
                <StatusDisplay error={{ message: "Invalid Ingredient data or item not found." }} dataType="Ingredient details" />
                <Button onClick={() => setCurrentPage('explorer')} variant="outline" className="mt-4">Back to Explorer</Button>
            </div>
        );
    }
    return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen bg-beige-50">
        <Button onClick={() => { setCurrentPage('explorer');}} variant="outline" iconLeft={<Icon name="ChevronLeft" className="h-5 w-5" />} className="mb-8 bg-white hover:bg-beige-200">
            Back to Explorer
        </Button>
        <Card className="shadow-xl overflow-hidden !border-amber-600/30">
            {item.image_url && (
                <img 
                    src={item.image_url} 
                    alt={item.name_english} 
                    className="w-full h-56 md:h-72 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x400/CCCCCC/FFFFFF?text=Ingredient+Image&font=Inter"; }}
                />
            )}
            <div className="p-6 md:p-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                     <div className="p-3 bg-green-100 rounded-full">
                        <Icon name="Leaf" className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-yellow-700">{item.name_english}</h1>
                        {item.name_arabic && <p className="text-xl text-yellow-600 font-mono mt-1">{item.name_arabic}</p>}
                         {item.category && <p className="text-sm text-stone-500 mt-1">Category: {item.category}</p>}
                    </div>
                </div>
                
                {item.description_tibbenabawi && <DetailPageSection title="Description (Tibb-e-Nabawi)" iconName="Info">{item.description_tibbenabawi}</DetailPageSection>}
                {item.prophetic_guidance_on_use && <DetailPageSection title="Prophetic Guidance on Use" iconName="BookOpen">{item.prophetic_guidance_on_use}</DetailPageSection>}
                {item.benefits_tibbenabawi && <DetailPageSection title="Benefits (Tibb-e-Nabawi)" iconName="Sparkles">{item.benefits_tibbenabawi}</DetailPageSection>}
                {item.preparation_methods && <DetailPageSection title="Preparation Methods" iconName="Users">{item.preparation_methods}</DetailPageSection>} 
                {item.scientific_properties && <DetailPageSection title="Scientific Properties" iconName="FlaskConical">{item.scientific_properties}</DetailPageSection>}
                {item.source_lesson_id_part2 && <p className="text-xs text-stone-400 mt-4">Source Lesson (Part 2): {item.source_lesson_id_part2}</p>}
            </div>
        </Card>
    </div>
    );
};
export default IngredientDetailPage;
