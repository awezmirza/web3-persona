import React from "react";
import "./HealthScore.css";

const HealthScoreFactors = () => {
  return (
    <div className="health-score-factors">
      <h3>Factors Affecting Health Score</h3>
      <ul>
        <li>
          <strong>Wallet Age:</strong> Older wallets score higher due to
          longevity.
        </li>
        <li>
          <strong>Token Diversity:</strong> Holding a wide variety of tokens
          increases score.
        </li>
        <li>
          <strong>Trusted Protocol Interaction:</strong> Activity with known
          safe contracts boosts score.
        </li>
        <li>
          <strong>Transaction Activity:</strong> High average transactions per
          month improves score.
        </li>
        <li>
          <strong>Recent Activity:</strong> Active wallets in the past 90 days
          are rewarded.
        </li>
        <li>
          <strong>Risk Behavior:</strong> Engaging with blacklisted or
          suspicious addresses reduces score.
        </li>
      </ul>
    </div>
  );
};

export default HealthScoreFactors;
