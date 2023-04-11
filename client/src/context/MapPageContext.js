import { createContext, useState, useCallback } from "react";
import foodBanks from "../data/foodBanks.json";
import communityGardens from "../data/communityGardens.json";
import initialMarkers from "../data/initialMarkers.json";
import recipients from "../data/recipients.json";

const MapPageContext = createContext();

const MapPageProvider = ({ children }) => {
  const [menu, setMenu] = useState("defaultMenu");
  const [coords, setCoords] = useState(null);
  const [zone, setZone] = useState(null);
  const [foodBankToggle, setFoodBankToggle] = useState(true);
  const [communityGardenToggle, setCommunityGardenToggle] = useState(true);

  const handleMenuClick = useCallback((clickedMenu) => {
    setMenu(clickedMenu);
  }, []);

  const handleDeliveryClick = useCallback((clicked, clickedZone) => {

    setMenu(clicked);
    setZone(clickedZone);
  }, []);

  const handleFoodBankToggle = useCallback(() => {
    setFoodBankToggle((prevToggle) => !prevToggle);
  }, []);

  const handleCommunityGardenToggle = useCallback(() => {
    setCommunityGardenToggle((prevToggle) => !prevToggle);
  }, []);

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
    menu,
    coords,
    zone,
    foodBankToggle,
    communityGardenToggle,
    foodBanks,
    recipients,
    communityGardens,
    initialMarkers,
    handleMenuClick,
    handleDeliveryClick,
    handleFoodBankToggle,
    handleCommunityGardenToggle,
    handleGeolocationRequest,
  };

  return (
    <MapPageContext.Provider value={contextValue}>
      {children}
    </MapPageContext.Provider>
  );
};

export { MapPageContext, MapPageProvider };
