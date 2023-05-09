import React, { createContext, useState, useCallback } from "react";
import foodBanks from "../data/foodBanks.json";

const FoodBankContext = createContext();

const FoodBankProvider = ({ children }) => {
  const [foodBankToggle, setFoodBankToggle] = useState(true);
  const [foodBankZone, setFoodBankZone] = useState(null);
  // Other food bank related states can be added here, if any.

  const handleFoodBankToggle = useCallback(() => {
    setFoodBankToggle((prevToggle) => !prevToggle);
  }, []);

  const contextValue = {
    foodBankToggle,
    foodBanks,
    handleFoodBankToggle,
    foodBankZone,
    setFoodBankZone,
    // Other exported values related to food banks can be added here, if any.
  };

  return (
    <FoodBankContext.Provider value={contextValue}>
      {children}
    </FoodBankContext.Provider>
  );
};

export { FoodBankContext, FoodBankProvider };
