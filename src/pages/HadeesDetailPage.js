// src/pages/HadeesDetailPage.js
import React from 'react';
import Icon from '../components/Icon';
import { Card } from '../components/Card';
import Button from '../components/Button';
import DetailPageSection from '../components/DetailPageSection';
import StatusDisplay from '../components/StatusDisplay';

const HadeesDetailPage = ({ item, setCurrentPage }) => {
    if (!item || item.type !== 'Hadees') {
        return (
            <div className="container mx-auto p-8 text-center">
                <StatusDisplay error={{ message: "Invalid Hadees data or item not found." }} dataType="Hadees details" />
                <Button onClick={() => setCurrentPage('explorer')} variant="outline" className="mt-4">Back to Explorer</Button>
            </div>
        );
    }
    return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-screen bg-beige-50">
        <Button onClick={() => { setCurrentPage('explorer'); }} variant="outline" iconLeft={<Icon name="ChevronLeft" className="h-5 w-5" />} className="mb-8 bg-white hover:bg-beige-200">
            Back to Explorer
        </Button>
        <Card className="p-6 md:p-10 shadow-xl !border-amber-600/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                    <Icon name="BookOpen" className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-yellow-700">{item.title || (item.text_english_translation ? item.text_english_translation.substring(0, 70) + "..." : `Hadees ID: ${item.hadees_id}`)}</h1>
                    {item.hadees_id && <p className="text-sm text-stone-400">ID: {item.hadees_id}</p>}
                </div>
            </div>
            
            {item.text_english_translation && (
                <DetailPageSection title="Translation" iconName="Quote">
                    <blockquote className="italic border-l-4 border-amber-500 pl-4 py-2 text-lg bg-amber-50/50 rounded-r-md">
                        "{item.text_english_translation}"
                    </blockquote>
                </DetailPageSection>
            )}

            {item.text_arabic && (
                 <DetailPageSection title="Arabic Text" iconName="BookOpen">
                    <p className="text-2xl font-mono text-right leading-loose rtl dir-rtl bg-green-50 p-4 rounded-md">{item.text_arabic}</p>
                </DetailPageSection>
            )}

            <div className="grid md:grid-cols-2 gap-x-8">
                {item.narrator && (
                    <DetailPageSection title="Narrator(s)">
                        <p>{item.narrator}</p>
                    </DetailPageSection>
                )}
                {(item.reference_book || item.reference_details) && (
                    <DetailPageSection title="Source Reference">
                        {item.reference_book && <p><strong>Book:</strong> {item.reference_book}</p>}
                        {item.reference_details && <p><strong>Details:</strong> {item.reference_details}</p>}
                        {item.source_page_pdf && <p><strong>Source Page (PDF):</strong> {item.source_page_pdf}</p>}
                    </DetailPageSection>
                )}
            </div>
            
            {item.topic_tags && Array.isArray(item.topic_tags) && item.topic_tags.length > 0 && (
                <DetailPageSection title="Topic Tags" iconName="Tag">
                    <div className="flex flex-wrap gap-2">
                        {item.topic_tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">{tag}</span>
                        ))}
                    </div>
                </DetailPageSection>
            )}
        </Card>
    </div>
    );
};
export default HadeesDetailPage;
