const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, hashedPassword,role]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.log("SIGN IN ERROR",error)
        res.status(500).json({ message: 'Server error' });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || (req.path === "/signup" && !name)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);


        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid Email Address!\nUser doesn't exist!" });
        }


        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            console.log("Incorrect Password Baby!")
            return res.status(400).json({ message: "Incorrect Password!" });
        }


        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { signup, login };