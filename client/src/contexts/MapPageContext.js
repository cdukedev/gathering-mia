import React, { createContext, useState, useCallback } from "react";

// Create a context to share map page data
const MapPageContext = createContext();

// Provider component for managing the map page state
const MapPageProvider = ({ children }) => {
  // State variable
  const [menu, setMenu] = useState("defaultMenu");

  /**
   * Handle menu click event.
   *
   * @param {string} clickedMenu - The menu option that was clicked.
   * @returns None.
   * @stateChange menu.
   * @dependencies None.
   */
  const handleMenuClick = useCallback((clickedMenu) => {
    setMenu(clickedMenu);
  }, []);

  // Provide the context value to components that consume the MapPageContext
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
