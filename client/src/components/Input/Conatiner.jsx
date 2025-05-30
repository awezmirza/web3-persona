import React, { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../constants";
import axios from "axios";

const Conatiner = ({ setFetching, setPersona }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const fetchPersona = async () => {
    try {
      setFetching(true);
      const trimmedAddress = walletAddress.trim();
      const response = await axios.get(
        BACKEND_URL + "/api/persona/" + trimmedAddress
      );

      setPersona(response.data);
    } catch (err) {
      setPersona(null);
      setFetching(false);
      toast.error(err.response?.data?.error || "Failed to fetch persona");
    }
  };

  return (
    <div className="input-conatiner">
      <div className="label-and-field">
        <h3>Enter Wallet Address</h3>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button type="submit" onClick={fetchPersona}>
          Generate Persona
        </button>
      </div>
      <div className="note">
        Note: The on chain data of Polygon blockchain will be used
      </div>
    </div>
  );
};

export default Conatiner;
