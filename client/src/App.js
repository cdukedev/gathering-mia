// Importing required modules and components
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage/MapPage";
import Home from "./pages/Home/Home";
import DirectionsMap from "./pages/DirectionsMap/DirectionsMap";
import QRScanner from "./Components/MapPageComponents/HomeDeliveryComponents/QRScanner/QRScanner";
import HomeDeliveries from "./pages/HomeDeliveries/HomeDeliveries";

/**
 * Functional component for the App. Essentials of react-router are used here.
 * Routes are created using the Route element from react-router-dom
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Route to the map page */}
        <Route path="/map" element={<MapPage />}></Route>

        {/* Default route or home route */}
        <Route path="/" element={<Home />}></Route>

        {/* Route for directions */}
        <Route
          path="/directions/:userLat/:userLng/:destinationLat/:destinationLng"
          element={<DirectionsMap />}
        />

        {/* Route for delivering */}
        <Route path="/deliver" element={<QRScanner />}></Route>

        {/* Route for home deliveries */}
        <Route path="/deliveries" element={<HomeDeliveries />}></Route>
      </Routes>
    </Router>
  );
}

// Exporting the App function as default module for use in other files
export default App;
