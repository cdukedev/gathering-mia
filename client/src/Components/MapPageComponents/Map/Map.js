import React, { useEffect, useRef } from "react";
import "./Map.scss";
import DirectionsRenderer from "./DirectionsRenderer/DirectionsRenderer";

const Map = ({ height, coords, destination }) => {
  const mapRef = useRef();
  useEffect(() => {
    if (document.querySelector("#google-maps-script")) return;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    if (!window.google || !window.google.maps) return;
    const loadMap = () => {
      if (!mapRef.current) return;

      new window.google.maps.Map(mapRef.current, {
        center: coords || { lat: 41.850033, lng: -87.6500523 },
        zoom: 8,
      });
    };

    if (window.google && window.google.maps) {
      loadMap();
    } else {
      document.addEventListener("google-maps-script-loaded", loadMap);
    }

    return () => {
      document.removeEventListener("google-maps-script-loaded", loadMap);
      mapRef.current = null;
    };
  }, [coords]);
  return (
    <div
      ref={mapRef}
      className="map"
      style={{ width: "100%", height: height || "100vh" }}
    >
      {mapRef.current && destination && (
        <DirectionsRenderer
          map={mapRef.current}
          origin={coords}
          destination={destination}
        />
      )}
    </div>
  );
};

export default Map;
