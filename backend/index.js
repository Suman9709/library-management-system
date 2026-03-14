import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";


dotenv.config();
const app = express();

const PORT = 3000;


app.use(express.json());
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})