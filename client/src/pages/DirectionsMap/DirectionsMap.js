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
  const [zoom, setZoom] = useState(14);
  const [tilt, setTilt] = useState(0);
  const [userPosition, setUserPosition] = useState(center);
  const [carMarker, setCarMarker] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [isFirstPersonView, setIsFirstPersonView] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom);
      mapRef.current.setTilt(tilt);
    }
  }, [zoom, tilt]);

  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);
  const toggleFirstPersonView = () => {
    setIsFirstPersonView((prevIsFirstPersonView) => {
      if (prevIsFirstPersonView) {
        setZoom(14);
        setTilt(0);
      } else {
        setZoom(18);
        setTilt(45);
        // Force an update of the map center
        if (mapRef.current && userPosition) {
          console.log("Forcing map center update:", userPosition);
          mapRef.current.setCenter(userPosition);
          if (mapRef.current.__gm) {
            console.log("Triggering resize event");
            window.google.maps.event.trigger(mapRef.current, "resize");
          }
        }
      }
      return !prevIsFirstPersonView;
    });
  };

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

    if (isFirstPersonView) {
      console.log("Setting map center to:", newPosition);
      mapRef.current.setCenter(newPosition);

      if (position.coords.heading !== null) {
        mapRef.current.setHeading(position.coords.heading);
      }
    }
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
  };

  const directionsCallback = (response, status) => {
    if (status === "OK") {
      setDirections(response);
      // Speak the first direction upon load
      if (response.routes[0].legs[0].steps.length > 0) {
        const firstStep = response.routes[0].legs[0].steps[0].instructions;
        speakDirections(
          `We greatly appreciate your time to deliver today. Allow me to help you find your way. ${firstStep}`
        );
      }
    } else {
      console.error(`Error fetching directions: ${status}`);
      setError(`Error fetching directions: ${status}`);
    }
  };

  const handleMapLoad = (map) => {
    console.log("Map object:", map);
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
        (position) => {
          console.log("Geolocation updated:", position);
          handleGeolocationUpdate(position);
        },
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
    <>
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
      </LoadScript>
      <button className="lets-go-button" onClick={toggleFirstPersonView}>
        Let's Go!
      </button>
    </>
  );
};

export default DirectionsMap;
