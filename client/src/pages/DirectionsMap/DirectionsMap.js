import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const DirectionsMap = () => {
  const { userLat, userLng, foodBankLat, foodBankLng } = useParams();
  const center = {
    lat: parseFloat(userLat),
    lng: parseFloat(userLng),
  };
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [userPosition, setUserPosition] = useState(center);
  const [carMarker, setCarMarker] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

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

  const updateCarMarker = (position) => {
    if (carMarker) {
      carMarker.setPosition(position);
    } else {
      const newMarker = new window.google.maps.Marker({
        position,
        map: mapRef.current,
        icon: "https://maps.gstatic.com/mapfiles/ms2/micons/red-pushpin.png",
      });
      setCarMarker(newMarker);
    }
    setUserPosition(position);
  };
  const handleGeolocationUpdate = (position) => {
    const newPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    updateCarMarker(newPosition);
  };
  const speakDirections = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const directionsCallback = (response, status) => {
    if (status === "OK") {
      setDirections(response);
      const steps = response.routes[0].legs[0].steps;
      steps.forEach((step) => {
        speakDirections(step.instructions);
      });
    } else {
      console.error(`Error fetching directions: ${status}`);
      setError(`Error fetching directions: ${status}`);
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
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

    if (!watchId) {
      const id = navigator.geolocation.watchPosition(
        handleGeolocationUpdate,
        (error) => console.error(error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
      setWatchId(id);
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
