import React, { createContext, useState, useCallback } from "react";

const GeolocationContext = createContext();

const GeolocationProvider = ({ children }) => {
  const [coords, setCoords] = useState(null);
  const [geolocationToggle, setGeolocationToggle] = useState(false);

  const handleGeolocationRequest = useCallback(() => {
    console.log("Geolocation request");
    if (navigator.geolocation) {
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
