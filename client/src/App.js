import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage/MapPage";
import Home from "./pages/Home/Home";
import { MapPageProvider } from "./context/MapPageContext";

const TopLevelComponent = () => {
  useEffect(() => {
    if (document.querySelector("#google-maps-script")) return;

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/map"
          element={
            <MapPageProvider>
              <MapPage />
            </MapPageProvider>
          }
        ></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};

export default TopLevelComponent;
