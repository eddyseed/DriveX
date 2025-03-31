const pool = require('../config/db');


const addCar = async (req, res) => {
    try {
        const { name, brand, color, category, second_hand, showroom_price } = req.body;

        if (!name || !brand || !color || !category || second_hand === undefined || !showroom_price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const query = `
            INSERT INTO cars_catalog (name, brand, color, category, second_hand, showroom_price)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;

        const values = [name, brand, color, category, second_hand, showroom_price];
        const { rows } = await pool.query(query, values);

        res.status(201).json({ message: "Car added successfully!", car: rows[0] });
    } catch (error) {
        console.error("❌ Error adding car:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const findCars = async (req, res) => {
    try {
        const { brand, category, color } = req.query;
        let query = `SELECT * FROM cars_catalog WHERE 1=1`;
        let values = [];
        let index = 1;

        if (brand) {
            query += ` AND brand = $${index++}`;
            values.push(brand);
        }
        if (category) {
            query += ` AND category = $${index++}`;
            values.push(category);
        }
        if (color) {
            query += ` AND color = $${index++}`;
            values.push(color);
        }

        const { rows } = await pool.query(query, values);
        res.status(200).json({ cars: rows });
    } catch (error) {
        console.error("❌ Error finding cars:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addCar, findCars };
