import OpenAI from 'openai';
import WalletPersona from '../models/WalletPersona.js';

export const generateWalletPersona = async (wallet) => {

    const persona = await WalletPersona.findOne({ wallet });
    if (!persona) {
        throw new Error('Persona not found for the wallet');
    }

    const now = new Date();
    const lastBioUpdate = persona.lastBioUpdate || new Date(0); // fallback to epoch
    const hoursSinceBioUpdate = (now - lastBioUpdate) / (1000 * 60 * 60);

    if (persona.aiPersona && persona.summary && hoursSinceBioUpdate < 24) {
        // Return cached bio/summary if updated within 24 hours
        return {
            bio: persona.aiPersona,
            summary: persona.summary,
            recommendations: persona.recommendations
        };
    }

    const { processedData, healthScore, type } = persona;

    const prompt = `
Analyze this Ethereum wallet and generate an AI-powered persona based on wallet behavior.

- Type: ${type}
- Wallet Health Score: ${healthScore}
- Unique Tokens Held: ${processedData?.uniqueTokens ?? 0}
- Days Old: ${processedData?.ageDays.toFixed(2) ?? 'N/A'}
- Average Transactions Per Month: ${processedData?.avgTxPerMonth.toFixed(2) ?? 'N/A'}
- Recent Transactions Count: ${processedData?.recentTxnsCount ?? 0}
- Number of Safe Contract Interactions: ${processedData?.safeContracts ?? 0}

Write a short AI-generated social media bio of less than 50 words of the wallet owner’s persona (investor, collector, airdrop hunter, etc.), personality traits, possible goals based on above data. Also generate a summary of this wallet. 
Also provide Personalized dApp or NFT recommendations.

Give the output in this JSON format (Add link in recommendations if available)

{
    "bio": "...",
    "summary": "...", 
    "recommendations": [{
        name: String,
        description: String,
        link: String
    }, ... upto 5 objects]
}

`;

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://openrouter.ai/api/v1'
    });

    const completion = await openai.chat.completions.create({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
            { role: 'system', content: 'You are a Web3 persona analyst AI.' },
            { role: 'user', content: prompt }
        ]
    });

    const rawContent = completion.choices[0]?.message?.content;

    let aiPersona;

    try {
        aiPersona = JSON.parse(rawContent);
    } catch (e) {
        console.error('Failed to parse AI response:', rawContent);
        throw new Error('AI response is not valid JSON');
    }

    persona.aiPersona = aiPersona.bio;
    persona.summary = aiPersona.summary;
    persona.recommendations = aiPersona.recommendations;
    persona.lastBioUpdate = now;
    await persona.save();

    return {
        bio: persona.aiPersona,
        summary: persona.summary,
        recommendations: persona.recommendations
    };;
};

