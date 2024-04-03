import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js'
import authRoutes  from './routes/auth.route.js'
import db from './db/db.js'


const app = express();
dotenv.config();
const PORT = 3001;
const URL = process.env.URL || 'http://localhost';

app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://mernauthapp.rikudev.com');
    res.setHeader('Access-Control-Allow-Origin', 'https://mern-auth-app-sable.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cors({
    origin: function(origin, callback) {
      // Permitir solicitudes si el origen está en la lista de orígenes permitidos o si no se proporciona origen (solicitud no CORS)
        if (!origin || origin.startsWith('https://mernauthapp.rikudev.com') || origin.startsWith('https://mern-auth-app-sable.vercel.app')) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    secure: true,
    sameSite: 'none',
}));
db.initDB();

app.listen(PORT, () => {
    console.log(`Server listening on ${URL}:${PORT}`);
});

app.use("/user", userRoutes)
app.use("/auth", authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});