const { createClient } = require('@supabase/supabase-js');
require('dotenv').config()

const supabase = createClient(process.env.DATABASE_URL, process.env.ANON_KEY);
module.exports = supabase;