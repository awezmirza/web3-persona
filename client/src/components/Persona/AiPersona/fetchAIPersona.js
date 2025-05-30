import axios from 'axios';
import { BACKEND_URL } from '../../../constants';

export const fetchAIPersona = async (walletAddress) => {
    try {
        const trimmedAddress = walletAddress.trim();
        const response = await axios.get(
            BACKEND_URL + "/api/ai/persona/" + trimmedAddress
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching AI Persona:', error);
        throw error;
    }
};
