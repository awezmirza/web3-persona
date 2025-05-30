// routes/ai.js
import express from 'express';
import { getAIPersona } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/persona
router.get('/persona/:walletAddress', getAIPersona);

export default router;
