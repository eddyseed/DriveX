// src/utils/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejhdljwtxbnskfszbkao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqaGRsand0eGJuc2tmc3pia2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDc4MDcsImV4cCI6MjA2MDE4MzgwN30.K-59L0RZ50InpGDVtZ2QkhwYcUFjNwNiGBuCyX0n0Ps';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
