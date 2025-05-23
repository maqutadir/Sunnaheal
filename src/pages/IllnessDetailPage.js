// src/pages/IllnessDetailPage.js
import React from 'react';
import Icon from '../components/Icon';
import { Card } from '../components/Card';
import Button from '../components/Button';
import DetailPageSection from '../components/DetailPageSection';
import StatusDisplay from '../components/StatusDisplay';

const IllnessDetailPage = ({ item, setCurrentPage }) => {
    if (!item || item.type !== 'Illness') {
         return (
            <div className="container mx-auto p-8 text-center">
                <StatusDisplay error={{ message: "Invalid Illness data or item not found." }} dataType="Illness details" />
                <Button onClick={() => setCurrentPage('explorer')} variant="outline" className="mt-4">Back to Explorer</Button>
            </div>
        );
    }

    let treatmentsArray = [];
    if (item.treatments_tibbenabawi) {
        if (Array.isArray(item.treatments_tibbenabawi)) {
            treatmentsArray = item.treatments_tibbenabawi;
        } else if (typeof item.treatments_tibbenabawi === 'string') { 
            try {
                treatmentsArray = JSON.parse(item.treatments_tibbenabawi);
            } catch (e) {
                console.error("Failed to parse treatments_tibbenabawi string:", item.illness_id, e);
                treatmentsArray = [{type: "General Treatment Note", description: item.treatments_tibbenabawi}];
            }
        } else {
             console.warn("treatments_tibbenabawi is not an array or string:", item.treatments_tibbenabawi);
             treatmentsArray = [{type: "General Treatment Note", description: String(item.treatments_tibbenabawi)}];
        }
    }
    
    if (!Array.isArray(treatmentsArray)) { 
        treatmentsArray = [{type: "General Treatment Note", description: String(item.treatments_tibbenabawi || "N/A")}];
    }

    return (
     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen bg-beige-50">
        <Button onClick={() => { setCurrentPage('explorer'); }} variant="outline" iconLeft={<Icon name="ChevronLeft" className="h-5 w-5" />} className="mb-8 bg-white hover:bg-beige-200">
            Back to Explorer
        </Button>
        <Card className="p-6 md:p-10 shadow-xl !border-amber-600/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                 <div className="p-3 bg-red-100 rounded-full">
                    <Icon name="Pill" className="h-10 w-10 text-red-600" />
                </div>
                 <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-yellow-700">{item.name_english}</h1>
                    {item.name_arabic && <p className="text-xl text-yellow-600 font-mono mt-1">{item.name_arabic}</p>}
                    {item.category && <p className="text-sm text-stone-500 mt-1">Category: {item.category}</p>}
                </div>
            </div>
            
            {item.description_tibbenabawi && <DetailPageSection title="Description (Tibb-e-Nabawi)" iconName="Info">{item.description_tibbenabawi}</DetailPageSection>}
            {item.causes_tibbenabawi && <DetailPageSection title="Causes (Tibb-e-Nabawi)" iconName="Microscope">{item.causes_tibbenabawi}</DetailPageSection>}
            {item.symptoms_tibbenabawi && <DetailPageSection title="Symptoms (Tibb-e-Nabawi)" iconName="HeartPulse">{item.symptoms_tibbenabawi}</DetailPageSection>}
            {item.preventative_measures_tibbenabawi && <DetailPageSection title="Preventative Measures (Tibb-e-Nabawi)" iconName="ShieldCheck">{item.preventative_measures_tibbenabawi}</DetailPageSection>}
            
            {treatmentsArray && treatmentsArray.length > 0 && (
                <DetailPageSection title="Treatments (Tibb-e-Nabawi)" iconName="ListChecks">
                    <ul className="space-y-4">
                        {treatmentsArray.map((treatment, index) => (
                            <li key={index} className="p-4 bg-amber-50/70 rounded-lg border border-amber-200">
                                {treatment.treatment_type && <strong className="block text-amber-700 text-md mb-1">{treatment.treatment_type}</strong>}
                                {treatment.description_or_reference_id && <p className="mb-1">{treatment.description_or_reference_id.startsWith('ing_') || treatment.description_or_reference_id.startsWith('dua_') || treatment.description_or_reference_id.startsWith('qv_') ? `Reference: ${treatment.description_or_reference_id}` : treatment.description_or_reference_id}</p>}
                                {treatment.description && !treatment.description_or_reference_id && <p className="mb-1">{treatment.description}</p>} 
                                {treatment.instructions && <p className="text-sm text-stone-600"><em>Instructions: {treatment.instructions}</em></p>}
                                {treatment.source_lesson_page && <p className="text-xs text-stone-500 mt-1">Source: {treatment.source_lesson_page}</p>}
                            </li>
                        ))}
                    </ul>
                </DetailPageSection>
            )}
            {item.source_lesson_id_part3 && <p className="text-xs text-stone-400 mt-4">Source Lesson (Part 3): {item.source_lesson_id_part3}</p>}
        </Card>
    </div>
    );
};
export default IllnessDetailPage;
