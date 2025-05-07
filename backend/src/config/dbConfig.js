// const { Pool } = require('pg');

// require('dotenv').config()

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password:  process.env.DB_PASS,
//     port: process.env.DB_PORT,
// })
// pool.on('error', (err) => {
//     console.error("Database Connection Error:", err);
// });
// module.exports = pool;

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config()

const supabase = createClient(process.env.DATABASE_URL, process.env.ANON_KEY);
module.exports = supabase;