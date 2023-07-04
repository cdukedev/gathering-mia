import React, { createContext, useState, useCallback } from "react";

// Create a context to share geolocation data
const GeolocationContext = createContext();

// Provider component for managing the geolocation state
const GeolocationProvider = ({ children }) => {
  // State variables
  const [coords, setCoords] = useState(null);
  const [geolocationToggle, setGeolocationToggle] = useState(false);

  /**
   * Handle geolocation request.
   *
   * @param None.
   * @returns None.
   * @stateChange coords.
   * @dependencies navigator.geolocation.
   */
  const handleGeolocationRequest = useCallback(() => {
    console.log("Geolocation request");
    if (navigator.geolocation) {
      // Get current position using browser's geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Provide the context value to components that consume the GeolocationContext
  const contextValue = {
    coords,
    geolocationToggle,
    handleGeolocationRequest,
    setGeolocationToggle,
  };

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  );
};

export { GeolocationContext, GeolocationProvider };
