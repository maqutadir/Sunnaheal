// src/services/apiService.js
import supabase from '../supabaseClient.js'; // Adjusted path

// IMPORTANT: Adjust table and column names to match your actual Supabase schema.

/**
 * Fetches all Hadees items from the 'hadees' table.
 * Schema assumptions:
 * PK: hadees_id (uuid)
 * Columns: title, text_english_translation, text_arabic, narrator, reference_book, reference_details, source_page_pdf, topic_tags (TEXT[])
 */
export const fetchAllHadees = async () => {
    if (!supabase) return { data: [], error: { message: "Supabase not configured" } };
    // Select specific columns based on assumed schema
    const { data, error } = await supabase
        .from('hadees')
        .select('hadees_id, title, text_english_translation, text_arabic, narrator, reference_book, reference_details, source_page_pdf, topic_tags, lesson_id, related_ingredient_ids, related_illness_ids');
    
    return { 
        data: data?.map(h => ({ 
            ...h, 
            type: 'Hadees' 
        })) || [], 
        error 
    };
};

/**
 * Fetches all Ingredient items from the 'ingredients' table.
 * Schema assumptions:
 * PK: ingredient_id (uuid)
 * Columns: name_english, name_arabic, category, description_tibbenabawi, prophetic_guidance_on_use, 
 * benefits_tibbenabawi, preparation_methods, scientific_properties, image_url, source_lesson_id_part2
 */
export const fetchAllIngredients = async () => {
    if (!supabase) return { data: [], error: { message: "Supabase not configured" } };
    const { data, error } = await supabase
        .from('ingredients')
        .select('ingredient_id, name_english, name_arabic, category, description_tibbenabawi, prophetic_guidance_on_use, benefits_tibbenabawi, preparation_methods, scientific_properties, image_url, source_lesson_id_part2');
    
    return { 
        data: data?.map(i => ({ 
            ...i, 
            type: 'Ingredient' 
        })) || [], 
        error 
    };
};

/**
 * Fetches all Illness items from the 'illnesses' table.
 * Schema assumptions:
 * PK: illness_id (uuid)
 * Columns: name_english, name_arabic, category, description_tibbenabawi, causes_tibbenabawi, 
 * symptoms_tibbenabawi, treatments_tibbenabawi (JSONB), preventative_measures_tibbenabawi, source_lesson_id_part3
 */
export const fetchAllIllnesses = async () => {
    if (!supabase) return { data: [], error: { message: "Supabase not configured" } };
    const { data, error } = await supabase
        .from('illnesses')
        .select('illness_id, name_english, name_arabic, category, description_tibbenabawi, causes_tibbenabawi, symptoms_tibbenabawi, treatments_tibbenabawi, preventative_measures_tibbenabawi, source_lesson_id_part3');
    
    return { 
        data: data?.map(i => ({ 
            ...i, 
            type: 'Illness' 
        })) || [], 
        error 
    };
};

/**
 * Fetches a combined list of all items for the Explorer page.
 */
export const fetchExplorerData = async () => {
    if (!supabase) {
        console.warn("Supabase not configured, returning empty for explorer.");
        return [];
    }
    try {
        const [hadeesRes, ingredientsRes, illnessesRes] = await Promise.all([
            fetchAllHadees(),
            fetchAllIngredients(),
            fetchAllIllnesses()
        ]);

        const errors = [hadeesRes.error, ingredientsRes.error, illnessesRes.error].filter(Boolean);
        if (errors.length > 0) {
            errors.forEach(err => console.error("Error fetching data for explorer:", err.message));
        }
        
        const combinedData = [
            ...(hadeesRes.data || []),
            ...(ingredientsRes.data || []),
            ...(illnessesRes.data || [])
        ];
        return combinedData;
    } catch (error) { 
        console.error("Critical error fetching combined explorer data:", error);
        return []; 
    }
};
