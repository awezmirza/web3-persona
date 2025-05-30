import React from "react";
import "./PersonaPage.css";
import HealthScoreSection from "./HealthScore/HealthScoreSection";
import AIPersonaDisplay from "./AiPersona/AIPersonaDisplay";

const PersonaPage = ({ persona }) => {
  return (
    <div className="persona-page-container">
      <HealthScoreSection persona={persona} />
      <AIPersonaDisplay walletAddress={persona.wallet} />
    </div>
  );
};

export default PersonaPage;
