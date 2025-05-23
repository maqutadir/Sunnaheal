// src/components/StatusDisplay.js
import React from 'react';
import Icon from './Icon';
import supabase, { supabaseUrl, supabaseAnonKey } from '../supabaseClient'; // Adjusted path

const StatusDisplay = ({ isLoading, error, dataType }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-stone-500 py-10 text-lg">
                <Icon name="Loader" size={48} className="mb-4" />
                <p>Loading {dataType || 'data'}...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-red-600 py-10 text-lg bg-red-50 p-6 rounded-lg border border-red-300">
                <Icon name="AlertTriangle" size={48} className="mb-4" />
                <p>Error fetching {dataType || 'data'}: {error.message}</p>
                {(!supabase || supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') && (
                    <p className="mt-2 text-sm text-red-500">Please ensure Supabase URL and Anon Key are correctly configured in the application code.</p>
                )}
            </div>
        );
    }
    return null;
};
export default StatusDisplay;
