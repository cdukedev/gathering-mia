import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage/MapPage";
import Home from "./pages/Home/Home";
import DirectionsMap from "./pages/DirectionsMap/DirectionsMap";
import QRScanner from "./Components/MapPageComponents/MapDeliveryComponents/QRScanner/QRScanner";
import { FoodBankProvider } from "./contexts/FoodBankContext";
import { CommunityGardenProvider } from "./contexts/CommunityGardenContext";
import { RecipientProvider } from "./contexts/RecipientContext";
import { GeolocationProvider } from "./contexts/GeolocationContext";
import { MapPageProvider } from "./contexts/MapPageContext";
import Deliveries from "./Components/MapPageComponents/MapDeliveryComponents/Deliveries/Deliveries";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/map"
          element={
            <FoodBankProvider>
              <CommunityGardenProvider>
                <RecipientProvider>
                  <GeolocationProvider>
                    <MapPageProvider>
                      <MapPage />
                    </MapPageProvider>
                  </GeolocationProvider>
                </RecipientProvider>
              </CommunityGardenProvider>
            </FoodBankProvider>
          }
        ></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/directions/:userLat/:userLng/:foodBankLat/:foodBankLng"
          element={<DirectionsMap />}
        />
        <Route path="/deliver" element={<QRScanner />}></Route>
        <Route
          path="/deliveries"
          element={
            <FoodBankProvider>
              <CommunityGardenProvider>
                <RecipientProvider>
                  <GeolocationProvider>
                    <MapPageProvider>
                      <Deliveries />
                    </MapPageProvider>
                  </GeolocationProvider>
                </RecipientProvider>
              </CommunityGardenProvider>
            </FoodBankProvider>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
