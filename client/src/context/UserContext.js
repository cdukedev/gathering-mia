import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <UserContext.Provider value={userCoords}>{children}</UserContext.Provider>
  );
};

const useUserCoords = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserCoords must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserCoords };
