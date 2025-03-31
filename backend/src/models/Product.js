const pool = require('../config/db');

const createProductTable = async() =>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cars_catalog(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            brand VARCHAR(50) NOT NULL,
            color VARCHAR(25) NOT NULL,
            category VARCHAR(50) NOT NULL CHECK (category IN ('hatchback','SUV','sedan')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            second_hand BOOLEAN NOT NULL,
            showroom_price INT NOT NULL
            );            
            
            `);
            console.log("✅ Cars table created successfully!");
    } catch (error) {
        console.error("❌ Error creating Cars table:", error);
    }finally{
        pool.end()
    }
}

createProductTable()