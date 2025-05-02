const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dashBoardRoute = require('./routes/dashboardRoute'); 
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // ✅ exact origin of frontend
    credentials: true
}));

// Test Route
app.get('/', (req, res) => {
    res.json({
        "name":"DriveX"
    });
});
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/abstract/', productRoutes);
app.use('/api/', dashBoardRoute)


// Server Configuration
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
