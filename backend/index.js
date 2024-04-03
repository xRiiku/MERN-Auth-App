import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './routes/user.route.js'
import authRoutes  from './routes/auth.route.js'
import db from './db/db.js'

const __dirname = path.resolve();
const app = express();
dotenv.config();
const PORT = 3001;
const URL = process.env.URL || 'http://localhost';


app.use(express.json());
app.use(cookieParser())
db.initDB();

app.listen(PORT, () => {
    console.log(`Server listening on ${URL}:${PORT}`);
});

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
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