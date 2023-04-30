import React, { useState, useRef, useEffect } from "react";
import "./DirectionsMap.scss";
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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [directionText, setDirectionText] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !directions) {
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
  }, [directions, center, foodBankLat, foodBankLng]);
  useEffect(() => {
    if (mapRef.current && !watchId) {
      const id = navigator.geolocation.watchPosition(
        handleGeolocationUpdate,
        (error) => console.error(error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
      setWatchId(id);
    }
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
    mapTypeId: "roadmap", // Use the hybrid map type for more detailed visuals
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
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

    if (
      directions &&
      currentStepIndex < directions.routes[0].legs[0].steps.length
    ) {
      const nextStep = directions.routes[0].legs[0].steps[currentStepIndex];
      const distanceToNextStep = haversineDistance(
        newPosition.lat,
        newPosition.lng,
        nextStep.start_location.lat(),
        nextStep.start_location.lng()
      );

      if (distanceToNextStep < 0.05) {
        // 0.05 km = 50 meters
        speakDirections(nextStep.instructions);
        setCurrentStepIndex(currentStepIndex + 1);
      }
    }
  };

  const speakDirections = (text) => {
    const cleanText = text.replace(/<[^>]*>?/gm, ""); // Remove any HTML tags
    const synth = window.speechSynthesis;
    console.log("Speaking direction:", cleanText); // Log the spoken direction
    const utterance = new SpeechSynthesisUtterance(cleanText);
    synth.speak(utterance);

    // Set the direction text and remove it after 8 seconds
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setDirectionText(cleanText);
    const id = setTimeout(() => {
      setDirectionText("");
    }, 8000);
    setTimeoutId(id);
  };

  const directionsCallback = (response, status) => {
    if (status === "OK") {
      setDirections(response);
      // Set and display the first direction upon load
      if (response.routes[0].legs[0].steps.length > 0) {
        const firstStep = response.routes[0].legs[0].steps[0].instructions;
        const rawInitialMessage = `We greatly appreciate your time to deliver today. Allow me to help you find your way. ${firstStep}`;

        // Clean any HTML tags in the initial message
        const initialMessage = rawInitialMessage.replace(/<[^>]*>?/gm, "");

        // Set the initial direction text and remove it after 8 seconds
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setDirectionText(initialMessage);
        const id = setTimeout(() => {
          setDirectionText("");
        }, 8000);
        setTimeoutId(id);

        // Speak the initial message
        speakDirections(initialMessage);
      }
    } else {
      console.error(`Error fetching directions: ${status}`);
      setError(`Error fetching directions: ${status}`);
    }
  };

  // To only speak the first time this one may work better.
  // const directionsCallback = (response, status) => {
  //   if (status === "OK") {
  //     setDirections(response);
  //     // Set and display the first direction upon load
  //     if (response.routes[0].legs[0].steps.length > 0) {
  //       const firstStep = response.routes[0].legs[0].steps[0].instructions;
  //       const rawInitialMessage = `We greatly appreciate your time to deliver today. Allow me to help you find your way. ${firstStep}`;

  //       // Clean any HTML tags in the initial message
  //       const initialMessage = rawInitialMessage.replace(/<[^>]*>?/gm, "");

  //       // Set the initial direction text and remove it after 8 seconds
  //       if (timeoutId) {
  //         clearTimeout(timeoutId);
  //       }
  //       setDirectionText(initialMessage);
  //       const id = setTimeout(() => {
  //         setDirectionText("");
  //       }, 8000);
  //       setTimeoutId(id);

  //       // Speak the initial message if the synth is not already speaking
  //       if (!window.speechSynthesis.speaking) {
  //         speakDirections(initialMessage);
  //       }
  //     }
  //   } else {
  //     console.error(`Error fetching directions: ${status}`);
  //     setError(`Error fetching directions: ${status}`);
  //   }
  // };

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

    // Increase the zoom level
    map.setZoom(18);
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
      {directionText && (
        <div className={`direction-box ${!directionText ? "fadeOut" : ""}`}>
          {directionText}
        </div>
      )}
    </LoadScript>
  );
};

export default DirectionsMap;
