import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

// Create a context to share recipient data
const RecipientContext = createContext();

// Provider component for managing recipients
const RecipientProvider = ({ children }) => {
  // State variables
  const [zone, setZone] = useState(null);
  const [recipients, setRecipients] = useState(null);
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [loadingRecipients, setLoadingRecipients] = useState(true); // add loading state
  const [sortedRecipients, setSortedRecipients] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Handle delivery click event.
   *
   * @param {boolean} clicked - Whether or not the delivery was clicked.
   * @param {string} clickedZone - The zone of the clicked delivery.
   * @stateChange zone.
   */
  const handleDeliveryClick = useCallback((clicked, clickedZone) => {
    setZone(clickedZone);
  }, []);

  // Fetch recipients data on component mount
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

  // Provide the context value to components that consume the RecipientContext
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
