import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
// import recipients from "../data/recipients.json";

const RecipientContext = createContext();

const RecipientProvider = ({ children }) => {
  const [zone, setZone] = useState(null);
  const [recipients, setRecipients] = useState(null);
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [loadingRecipients, setLoadingRecipients] = useState(true); // add loading state
  const [sortedRecipients, setSortedRecipients] = useState([]);
  const [error, setError] = useState(null);

  const handleDeliveryClick = useCallback((clicked, clickedZone) => {
    setZone(clickedZone);
  }, []);

  useEffect(() => {
    axios
      .get("https://dwka6a2xd6.execute-api.us-east-1.amazonaws.com/recipients")
      .then((response) => {
        console.log("Data fetched successfully");
        setRecipients(response.data);
        setLoadingRecipients(false); // stop loading once data is fetched
      })
      .catch((error) => {
        setError(error); // set error state
        console.error("Error fetching data: ", error);
        setLoadingRecipients(false); // stop loading on error
      });
  }, []);

  const contextValue = {
    zone,
    recipients,
    loadingRecipients,
    handleDeliveryClick,
    sortedRecipients,
    setSortedRecipients,
    currentRecipient,
    setCurrentRecipient,
  };

  return (
    <RecipientContext.Provider value={contextValue}>
      {children}
    </RecipientContext.Provider>
  );
};

export { RecipientContext, RecipientProvider };
