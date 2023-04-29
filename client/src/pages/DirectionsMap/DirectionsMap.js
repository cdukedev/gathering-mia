import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const DirectionsMap = () => {
  const { userLat, userLng, foodBankLat, foodBankLng } = useParams();
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  const center = {
    lat: parseFloat(userLat),
    lng: parseFloat(userLng),
  };

  const directionsCallback = (response, status) => {
    if (status === "OK") {
      setDirections(response);
    } else {
      console.error(`Error fetching directions: ${status}`);
      setError(`Error fetching directions: ${status}`);
    }
  };

  const handleMapLoad = () => {
    if (!directions) {
      const request = {
        origin: center,
        destination: {
          lat: parseFloat(foodBankLat),
          lng: parseFloat(foodBankLng),
        },
        travelMode: "DRIVING",
      };
      new window.google.maps.DirectionsService().route(
        request,
        directionsCallback
      );
    }
  };

  if (!userLat || !userLng || !foodBankLat || !foodBankLng) {
    return <div>Error: Missing location parameters</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={mapOptions}
        onLoad={handleMapLoad}
      >
        {directions && (
          <DirectionsRenderer
            options={{
              directions,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default DirectionsMap;
