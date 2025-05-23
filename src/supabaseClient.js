// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Load Supabase URL and Anon Key from environment variables
// For Create React App, environment variables must be prefixed with REACT_APP_
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Basic validation for Supabase credentials
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "Supabase URL or Anon Key is not configured in your environment variables (REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY). Please set them up. App functionality will be limited."
    );
}

// Initialize Supabase client only if URL and Key are valid
const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default supabase;
// Exporting these for potential use in StatusDisplay or other debugging/config checks
export { supabaseUrl, supabaseAnonKey }; 
