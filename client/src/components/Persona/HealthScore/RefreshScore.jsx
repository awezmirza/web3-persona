import React from "react";

const RefreshScore = ({ time }) => {
  const lastDataUpdated = new Date(time);
  const nextAvailable = new Date(
    lastDataUpdated.getTime() + 24 * 60 * 60 * 1000
  );
  const now = new Date();

  const isAvailable = now >= nextAvailable;

  return (
    <div>
      {isAvailable ? (
        "Reload the website to check updated score"
      ) : (
        <>Score will be updated at {nextAvailable.toLocaleString()}</>
      )}
    </div>
  );
};

export default RefreshScore;
