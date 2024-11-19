const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware de registro de actividad
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Habilita CORS para todas las solicitudes
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));