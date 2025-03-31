const pool = require('../config/db');

const createUserTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                role VARCHAR(50) NOT NULL DEFAULT 'customer' CHECK (role IN ('customer','admin','seller'))
            );
        `);
        console.log("✅ Users table created successfully!");
    } catch (error) {
        console.error("❌ Error creating users table:", error);
    } finally {
        pool.end(); 
    }
};

createUserTable();
