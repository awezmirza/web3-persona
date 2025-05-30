import mongoose from 'mongoose';

const walletPersonaSchema = new mongoose.Schema({
  wallet: { type: String, unique: true },
  type: String,
  healthScore: Number,
  bio: String,
  recommendations: [
    {
      name: String,
      description: String,
      link: String
    }
  ],
  rawData: Object,
  processedData: Object,
  lastUpdated: { type: Date, default: Date.now },      // general updates (e.g. bio)
  lastDataUpdated: { type: Date },                     // raw/processed data only
  aiPersona: { type: String },
  summary: { type: String },
  lastBioUpdate: { type: Date }
});

export default mongoose.model('WalletPersona', walletPersonaSchema);