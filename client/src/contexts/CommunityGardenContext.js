import React, { createContext, useState, useCallback } from "react";
import communityGardens from "../data/communityGardens.json";

const CommunityGardenContext = createContext();

const CommunityGardenProvider = ({ children }) => {
  const [communityGardenToggle, setCommunityGardenToggle] = useState(true);

  const handleCommunityGardenToggle = useCallback(() => {
    setCommunityGardenToggle((prevToggle) => !prevToggle);
  }, []);

  const contextValue = {
    communityGardenToggle,
    communityGardens,
    handleCommunityGardenToggle,
  };

  return (
    <CommunityGardenContext.Provider value={contextValue}>
      {children}
    </CommunityGardenContext.Provider>
  );
};

export { CommunityGardenContext, CommunityGardenProvider };
