import { validateAddress } from '../utils/validateAddress.js';
import { analyzeWallet } from '../services/analysisService.js';
import WalletPersona from '../models/WalletPersona.js';

export const getPersona = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        if (!validateAddress(walletAddress)) return res.status(400).json({ error: 'Invalid wallet address' });

        const existing = await WalletPersona.findOne({ wallet: walletAddress });
        const isFresh = existing && (Date.now() - new Date(existing.lastUpdated)) < 86400000;

        if (existing && isFresh) return res.json(existing);

        const data = await analyzeWallet(walletAddress);
        const newPersona = await WalletPersona.findOneAndUpdate(
            { wallet: walletAddress },
            { ...data, lastUpdated: new Date() },
            { new: true, upsert: true }
        );

        res.json(newPersona);
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: 'Getting persona failed', message: err.message });
    }
};
