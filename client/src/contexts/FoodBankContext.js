import React, { createContext, useState, useCallback, useEffect } from "react";
// import foodBanks from "../data/foodBanks.json";
import axios from "axios";

const FoodBankContext = createContext();

const FoodBankProvider = ({ children }) => {
  const [foodBankToggle, setFoodBankToggle] = useState(true);
  const [foodBankZone, setFoodBankZone] = useState(null);
  const [foodBanks, setFoodBanks] = useState("");
  const [loading, setLoading] = useState(true); // add loading state
  const [error, setError] = useState(null);

  const handleFoodBankToggle = useCallback(() => {
    setFoodBankToggle((prevToggle) => !prevToggle);
  }, []);
  useEffect(() => {
    axios
      .get("https://dwka6a2xd6.execute-api.us-east-1.amazonaws.com/foodbanks")
      .then((response) => {
        setFoodBanks(response.data);
        setLoading(false); // stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error); // set error state
        setLoading(false); // stop loading on error
      });
  }, []);

  const contextValue = {
    foodBankToggle,
    foodBanks,
    loading, // pass down the loading and error states
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
