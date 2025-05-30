import React, { useState } from "react";
import VantaNetBG from "./VantaNetBG";
import Conatiner from "./Conatiner";

import { Mosaic } from "react-loading-indicators";

const InputAddress = ({ setPersona }) => {
  const [fetching, setFetching] = useState(false);

  if (fetching) {
    return (
      <div className="loading-container">
        <Mosaic
          size="large"
          text="Loading..."
          color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
        />
      </div>
    );
  }

  return (
    <>
      <div className="page input-page">
        <VantaNetBG />
        <Conatiner setFetching={setFetching} setPersona={setPersona} />
      </div>
    </>
  );
};

export default InputAddress;
