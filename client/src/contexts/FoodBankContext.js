import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";

// Create a context to share food bank data
const FoodBankContext = createContext();

// Provider component for managing the food bank state
const FoodBankProvider = ({ children }) => {
  // State variables
  const [foodBankToggle, setFoodBankToggle] = useState(true);
  const [foodBankZone, setFoodBankZone] = useState(null);
  const [foodBanks, setFoodBanks] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  /**
   * Handle food bank toggle.
   *
   * @param None.
   * @returns None.
   * @stateChange foodBankToggle.
   */
  const handleFoodBankToggle = useCallback(() => {
    setFoodBankToggle((prevToggle) => !prevToggle);
  }, []);

  useEffect(() => {
    // Fetch food banks data from API endpoint
    axios
      .get("https://dwka6a2xd6.execute-api.us-east-1.amazonaws.com/foodbanks")
      .then((response) => {
        setFoodBanks(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error); // Set error state
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Provide the context value to components that consume the FoodBankContext
  const contextValue = {
    foodBankToggle,
    foodBanks,
    loading, // Pass down the loading and error states
    error,
    handleFoodBankToggle,
    foodBankZone,
    setFoodBankZone,
  };

  return (
    <FoodBankContext.Provider value={contextValue}>
      {children}
    </FoodBankContext.Provider>
  );
};

export { FoodBankContext, FoodBankProvider };
