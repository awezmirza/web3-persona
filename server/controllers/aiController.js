import { generateWalletPersona } from '../services/aiService.js';

export const getAIPersona = async (req, res) => {
    const { wallet } = req.body;

    if (!wallet) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    try {
        const aiPersona = await generateWalletPersona(wallet);
        res.json(aiPersona);
    } catch (error) {
        console.error('Error generating AI persona:', error.message);
        res.status(500).json({ error: 'Server error generating AI persona' });
    }
};