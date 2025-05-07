const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const data = require('../package.json');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dashBoardRoute = require('./routes/dashboardRoute'); 


const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: `http://localhost:${process.env.APPLICATION_PORT}`,
    credentials: true
}));

app.get('/', (req, res) => {
    res.json({
        "name": data.name,
        "language": req.headers['accept-language']
    });
});

app.use('/api/auth/', authRoutes);
app.use('/api/abstract/', productRoutes);
app.use('/api/', dashBoardRoute)



const PORT = process.env.SERVER_PORT || '5000';
app.listen(PORT, () => console.log(`Go To: http://localhost:${PORT}/`));
