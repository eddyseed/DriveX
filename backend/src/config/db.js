const { Pool } = require('pg');require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'e_commerce_app',
    password:  "admin",
    port: Number(process.env.DB_PORT) || 5432
})
pool.on('error', (err) => {
    console.error("Database Connection Error:", err);
});
module.exports = pool;