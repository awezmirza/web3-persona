import { useState } from "react";
import InputAddress from "./Input/InputAddress";
import PersonaPage from "./Persona/PersonaPage";

const DataCenter = () => {
  const [persona, setPersona] = useState(null);

  if (!persona) {
    return <InputAddress setPersona={setPersona} />;
  }

  return <PersonaPage persona={persona} />;
};

export default DataCenter;
