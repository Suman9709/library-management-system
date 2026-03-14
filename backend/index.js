import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import authRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import bookRouter from './routes/book.routes.js';
import { createAdmin } from './utils/createAdmin.js';

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const PORT = 3000;


app.use(express.json());
connectDB().then(() => {
    createAdmin();
});

app.use('/api/auth', authRouter)
app.use('/api/books', bookRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})