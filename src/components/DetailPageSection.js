// src/components/DetailPageSection.js
import React from 'react';
import Icon from './Icon';

const DetailPageSection = ({ title, children, iconName }) => (
    <div className="mb-8">
        <div className="flex items-center mb-3">
            {iconName && <Icon name={iconName} className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />}
            <h2 className="text-2xl font-semibold text-amber-700 border-b-2 border-amber-300 pb-2 flex-grow">{title}</h2>
        </div>
        <div className="text-stone-700 leading-relaxed prose prose-stone prose-lg max-w-none">{children}</div>
    </div>
);
export default DetailPageSection;
