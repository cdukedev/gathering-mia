import React, { useState, useRef, useEffect, useContext } from "react";
import "./DirectionsMap.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RecipientContext } from "../../contexts/RecipientContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

const DirectionsMap = () => {
  const navigate = useNavigate();
  const { userLat, userLng, destinationLat, destinationLng } = useParams();
  const { sortedRecipients, setSortedRecipients, currentRecipient } =
    useContext(RecipientContext);
  const [hasCallbackRun, setHasCallbackRun] = useState(false);
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
  const google = window.google;

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !directions) {
      const request = {
        origin: center,
        destination: {
          lat: parseFloat(destinationLat),
          lng: parseFloat(destinationLng),
        },
        travelMode: "DRIVING",
      };
      new google.maps.DirectionsService().route(request, directionsCallback);
    }
  }, [directions, center, destinationLat, destinationLng]);

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
    fullscreenControl: false,
    mapTypeId: "roadmap", // Use the hybrid map type for more detailed visuals
  };

  const handleDeliveryClick = () => {
    const newRecipients = [...sortedRecipients];
    newRecipients.shift();
    setSortedRecipients(newRecipients);
    console.log("sortedRecipients", sortedRecipients);
    console.log("newRecipients", newRecipients);
    setCurrentStepIndex(0);
    setDirections(null);
    navigate("/deliveries");
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };
  const updateCarMarker = (position) => {
    if (carMarker) {
      carMarker.setPosition(position);
    } else {
      const newMarker = new google.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
          scaledSize: new google.maps.Size(20, 20),
          anchor: { x: 10, y: 10 },
        },
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
    console.log("New position:", newPosition); // Log the new position
    updateCarMarker(newPosition);
    if (directions) {
      if (currentStepIndex < directions.routes[0].legs[0].steps.length) {
        const nextStep = directions.routes[0].legs[0].steps[currentStepIndex];
        const distanceToNextStep = haversineDistance(
          newPosition.lat,
          newPosition.lng,
          nextStep.start_location.lat(),
          nextStep.start_location.lng()
        );
        console.log(
          "Next step start location:",
          nextStep.start_location.toJSON()
        ); // Log the next step start location

        if (distanceToNextStep < 0.0378788) {
          // 0.0378788 miles = 200 feet
          speakDirections(nextStep.instructions);
          setCurrentStepIndex(currentStepIndex + 1);
        }
      }
    }
  };

  const speakDirections = (text) => {
    if ("speechSynthesis" in window) {
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
    } else {
      console.error(
        "Text-to-speech is not supported in this browser or device"
      );
    }
  };

  // To only speak the first time this one may work better.
  const directionsCallback = (response, status) => {
    if (hasCallbackRun) return;
    if (status === "OK") {
      setDirections(response);
      // Set and display the first direction upon load
      if (response.routes[0].legs[0].steps.length > 0) {
        const firstStep = response.routes[0].legs[0].steps[0].instructions;
        const rawInitialMessage = `We greatly appreciate your time to deliver today. Allow me to help you find your way. ${firstStep}`;

        // Clean any HTML tags in the initial message
        const initialMessage = rawInitialMessage.replace(/<[^>]*>?/gm, "");

        // Set the initial direction text and remove it after 8 seconds
        // if (timeoutId) {
        //   clearTimeout(timeoutId);
        // }
        setDirectionText(initialMessage);
        const id = setTimeout(() => {
          setDirectionText("");
        }, 8000);
        setTimeoutId(id);

        // Speak the initial message if the synth is not already speaking
        if (!window.speechSynthesis.speaking) {
          speakDirections(initialMessage);
        }
      }
    } else {
      console.error(`Error fetching directions: ${status}`);
      if (status === "ZERO_RESULTS") {
        toast.error(
          "We apologize for the inconvenience, we were unable to locate a route. Our team has been notified and is currently working on a solution. In the meantime, please don't worry about returning the food. Thank you for your understanding.",
          {
            autoClose: 13000,
          }
        );
        // Remove the recipient from the list of sorted recipients
        const newRecipients = [...sortedRecipients];
        newRecipients.shift();
        setSortedRecipients(newRecipients);
        // Navigate back to the deliveries page
        navigate("/deliveries");
      } else {
        setError(`Error fetching directions: ${status}`);
      }
      setHasCallbackRun(true);
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;

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

  if (!userLat || !userLng || !destinationLat || !destinationLng) {
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
              suppressMarkers: true,
            }}
          />
        )}
        <Marker
          position={{
            lat: parseFloat(destinationLat),
            lng: parseFloat(destinationLng),
          }}
        />
        {directions && (
          <Marker
            position={userPosition}
            icon={{
              url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
              scaledSize: new window.google.maps.Size(20, 20),
              anchor: new window.google.maps.Point(10, 10),
            }}
          />
        )}
      </GoogleMap>
      {directionText && (
        <div className={`direction-box ${!directionText ? "fadeOut" : ""}`}>
          {directionText}
        </div>
      )}
      {/* if current recipient is truthy call the handleDeliveryClick otherwise link to the delivery page */}
      {currentRecipient && (
        <button
          className="arrived-button"
          onClick={() => handleDeliveryClick()}
        >
          Delivery Successful
        </button>
      )}
      {!currentRecipient && (
        <Link to="/deliver">
          <button className="arrived-button">Arrived</button>
        </Link>
      )}
    </LoadScript>
  );
};

export default DirectionsMap;
