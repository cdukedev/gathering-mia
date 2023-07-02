import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage/MapPage";
import Home from "./pages/Home/Home";
import DirectionsMap from "./pages/DirectionsMap/DirectionsMap";
import QRScanner from "./Components/MapPageComponents/HomeDeliveryComponents/QRScanner/QRScanner";
import HomeDeliveries from "./pages/HomeDeliveries/HomeDeliveries";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/directions/:userLat/:userLng/:destinationLat/:destinationLng"
          element={<DirectionsMap />}
        />
        <Route path="/deliver" element={<QRScanner />}></Route>
        <Route path="/deliveries" element={<HomeDeliveries />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
