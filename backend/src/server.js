const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));

// Test Route
app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
