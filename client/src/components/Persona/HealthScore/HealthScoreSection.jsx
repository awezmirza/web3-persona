import React from "react";
import "./HealthScore.css";
import WalletRadarChart from "./WalletRadarChart";
import HealthMeter from "./HealthMeter";
import HealthScoreFactors from "./HealthScoreFactors";
import RefreshScore from "./RefreshScore";

const HealthScoreSection = ({ persona }) => {
  return (
    <div className="health-score-section">
      <div className="health-meter-container">
        <HealthMeter value={persona?.healthScore || 0} />
        <RefreshScore time={persona?.lastDataUpdated || Date.now()} />
      </div>
      <div className="wallet-radar-container">
        <WalletRadarChart processedData={persona.processedData} />
      </div>
      <div className="factors">
        <HealthScoreFactors />
      </div>
    </div>
  );
};

export default HealthScoreSection;
