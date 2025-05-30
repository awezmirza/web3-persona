import React, { useEffect, useState } from "react";
import { fetchAIPersona } from "./fetchAIPersona";
import PersonaDetails from "./PersonaDetails";
// import { fetchAIPersona } from "../api/fetchAIPersona";

const AIPersonaDisplay = ({ walletAddress }) => {
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPersona = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAIPersona(walletAddress);
        setPersona(data);
      } catch (err) {
        setError("Failed to fetch AI persona");
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) getPersona();
  }, [walletAddress]);

  if (loading) return <div>Loading AI Persona...</div>;
  if (error) return <div>{error}</div>;

  console.log(persona);

  return (
    <>
      {persona ? (
        <PersonaDetails persona={persona} />
      ) : (
        <div>No AI Persona available</div>
      )}
    </>
  );
};

export default AIPersonaDisplay;
