import React, { createContext, useState, useCallback } from "react";

const MapPageContext = createContext();

const MapPageProvider = ({ children }) => {
  const [menu, setMenu] = useState("defaultMenu");

  const handleMenuClick = useCallback((clickedMenu) => {
    setMenu(clickedMenu);
  }, []);


  const contextValue = {
    menu,
    handleMenuClick,
  };

  return (
    <MapPageContext.Provider value={contextValue}>
      {children}
    </MapPageContext.Provider>
  );
};

export { MapPageContext, MapPageProvider };
