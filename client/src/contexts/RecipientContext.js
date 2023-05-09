import React, { createContext, useState, useCallback } from "react";
import recipients from "../data/recipients.json";

const RecipientContext = createContext();

const RecipientProvider = ({ children }) => {
  const [zone, setZone] = useState(null);

  const handleDeliveryClick = useCallback((clicked, clickedZone) => {
    setZone(clickedZone);
  }, []);

  const contextValue = {
    zone,
    recipients,
    handleDeliveryClick,
  };

  return (
    <RecipientContext.Provider value={contextValue}>
      {children}
    </RecipientContext.Provider>
  );
};

export { RecipientContext, RecipientProvider };
