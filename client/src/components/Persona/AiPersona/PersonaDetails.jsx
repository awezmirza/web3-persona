import React from "react";
import "./AiPersona.css";

const PersonaDetails = ({ persona }) => {
  if (!persona) return null;

  return (
    <div className="persona-container">
      <h2>AI Persona</h2>

      {persona.bio && (
        <div className="persona-section">
          <h3>🧬 Bio</h3>
          <p>{persona.bio}</p>
        </div>
      )}

      {persona.summary && (
        <div className="persona-section">
          <h3>🧠 Summary</h3>
          <p>{persona.summary}</p>
        </div>
      )}

      {persona.recommendations && persona.recommendations.length > 0 && (
        <div className="persona-section">
          <h3>🔗 Recommendations</h3>
          <ul className="recommendation-list">
            {persona.recommendations.map((rec) => (
              <li key={rec._id} className="recommendation-item">
                <a href={rec.link} target="_blank" rel="noopener noreferrer">
                  <strong>{rec.name}</strong>
                </a>
                <p>{rec.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PersonaDetails;
