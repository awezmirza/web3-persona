import { fetchWalletTransactions, fetchTokenTransfers } from './onchainService.js';

export const analyzeWallet = async (wallet) => {
    const txns = await fetchWalletTransactions(wallet);
    const tokens = await fetchTokenTransfers(wallet);

    const now = Date.now() / 1000;
    const firstTxn = parseInt(txns[0]?.timeStamp || now, 10);
    const ageDays = (now - firstTxn) / 86_400;           // seconds → days

    /* ---------- 1.  Core scores (same as before) --------------------------- */
    const ageScore =
        ageDays > 365 * 10 ? 25 :
            ageDays > 365 * 5 ? 24 :
                ageDays > 365 * 4 ? 23 :
                    ageDays > 365 * 3 ? 22 :
                        ageDays > 365 * 2 ? 21 :
                            ageDays > 365 ? 20 :
                                ageDays > 180 ? 17 :
                                    ageDays > 90 ? 15 : 5;

    const uniqueTokens = new Set(tokens.map(t => t.contractAddress)).size;
    const diversityScore =
        uniqueTokens >= 20 ? 20 :
            uniqueTokens;

    const knownContracts = [
        '0xD3134F33384F23D6e9ae5d36F494dEd2F75536f0',
        '0xC5bC24b00F4501B79dd47864737c8bF9Af18Cc19',
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
    ];
    const interactedContracts = new Set(txns.map(tx => tx.to));
    const safeCount = [...interactedContracts].filter(a => knownContracts.includes(a)).length;
    const protocolScore = safeCount >= 3 ? 20 : safeCount >= 2 ? 15 : 10;

    const avgTxPerMonth = txns.length / (ageDays / 30);
    const txnScore = avgTxPerMonth > 20 ? 20 : avgTxPerMonth > 10 ? 15 : 10;

    const recentTxns = txns.filter(tx => now - parseInt(tx.timeStamp, 10) <= 90 * 86_400);
    const recentActivity = recentTxns.length > 50 ? 10 :
        recentTxns.length > 20 ? 5 :
            recentTxns.length < 5 ? -5 : 0;

    const riskScore = txns.some(tx => tx.to === '0x000...') ? 5 : 15;

    /* ---------- 2.  Total & label ----------------------------------------- */
    const totalScore = ageScore + diversityScore + protocolScore +
        txnScore + recentActivity + riskScore;

    const label =
        totalScore >= 95 ? 'Legendary' :
            totalScore >= 85 ? 'Excellent' :
                totalScore >= 70 ? 'Good' :
                    totalScore >= 55 ? 'Fair' :
                        totalScore >= 40 ? 'Poor' : 'Risky';

    /* ---------- 3.  Expanded type bucketing ------------------------------- */
    let type;
    if (avgTxPerMonth > 50) type = 'Power Trader';
    else if (uniqueTokens >= 25) type = 'Collector';
    else if (safeCount >= 5 && uniqueTokens >= 5) type = 'Investor';
    else if (recentTxns.length >= 20 && uniqueTokens < 10) type = 'Airdrop Hunter';
    else if (uniqueTokens < 5 && avgTxPerMonth < 5) type = 'Dormant';
    else type = 'General User';

    /* ---------- 4.  Return ------------------------------------------------- */
    return {
        wallet,
        healthScore: totalScore,
        type,
        label,
        rawData: { txns, tokens },
        processedData: {
            ageDays,
            uniqueTokens,
            safeContracts: safeCount,
            avgTxPerMonth,
            recentTxnsCount: recentTxns.length
        }
    };
};
