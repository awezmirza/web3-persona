import { generateWalletPersona } from '../services/aiService.js';
import { validateAddress } from '../utils/validateAddress.js';

export const getAIPersona = async (req, res) => {
    const { walletAddress } = req.params;

    if (!validateAddress(walletAddress)) {
        return res.status(400).json({ error: 'Invalid wallet address' });
    }

    try {
        const aiPersona = await generateWalletPersona(walletAddress);
        res.json(aiPersona);
    } catch (error) {
        console.error('Error generating AI persona:', error.message);
        res.status(500).json({ error: 'Server error generating AI persona' });
    }
};