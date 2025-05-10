import express from 'express';
import { getPersona } from '../controllers/personaController.js';
const router = express.Router();

router.get('/:walletAddress', getPersona);

export default router;