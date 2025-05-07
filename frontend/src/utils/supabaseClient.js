import { createClient } from '@supabase/supabase-js';

const ANON_KEY = 'ANON_KEY =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqaGRsand0eGJuc2tmc3pia2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDc4MDcsImV4cCI6MjA2MDE4MzgwN30.K-59L0RZ50InpGDVtZ2QkhwYcUFjNwNiGBuCyX0n0Ps'
const PROJECT_URL=`https://ejhdljwtxbnskfszbkao.supabase.co`
const supabase = createClient(PROJECT_URL, ANON_KEY);
export default supabase;