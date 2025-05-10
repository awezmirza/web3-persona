import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import personaRoutes from './routes/personaRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/persona', personaRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));