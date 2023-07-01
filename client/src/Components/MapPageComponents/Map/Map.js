import React, { useState, useContext, useCallback, useMemo } from "react";
import { MapPageContext } from "../../../contexts/MapPageContext";
import { GeolocationContext } from "../../../contexts/GeolocationContext"; // Import GeolocationContext
import { FoodBankContext } from "../../../contexts/FoodBankContext";
import { CommunityGardenContext } from "../../../contexts/CommunityGardenContext";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import Splash from "../../Splash/Splash";
import foodBank from "../../../assets/icons/foodbank.svg";
import communityGarden from "../../../assets/icons/community-garden.svg";

const Map = ({ height, zoom }) => {
  const { foodBanks, foodBankToggle, loading } = useContext(FoodBankContext);
  const { communityGardens, communityGardenToggle } = useContext(
    CommunityGardenContext
  );
  const { coords } = useContext(GeolocationContext); // Get coords from GeolocationContext
  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [center] = useState(
    coords
      ? {
          lat: coords.lat,
          lng: coords.lng,
        }
      : null
  );

  const markers = useMemo(
    () => [...foodBanks, ...communityGardens],
    [foodBanks, communityGardens]
  );
  const containerStyle = {
    width: "100vw",
    height: `${height}`,
  };

  const createMapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };

  const markerClicked = useCallback((index) => {
    setActiveInfoWindow(index);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      {center && (
        <GoogleMap
          data-testid="google-map"
          mapContainerStyle={containerStyle}
          options={createMapOptions}
          center={center}
          zoom={zoom || 13}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              data-testid={`marker-${index}`}
              // position will be displayed if the filter toggle is true
              position={
                marker.type === "Food Bank" && foodBankToggle
                  ? marker.position
                  : marker.type === "Community Garden" && communityGardenToggle
                  ? marker.position
                  : null
              }
              //set icon to foodbank image if name is foodbank
              // else set icon to home image if name is home
              // else set icon to community garden image if name is community garden
              icon={
                marker.type === "Food Bank"
                  ? foodBank
                  : marker.type === "Community Garden"
                  ? communityGarden
                  : null
              }
              onClick={() => markerClicked(index)}
            >
              {activeInfoWindow === index && (
                <InfoWindow position={marker.position}>
                  <b>
                    <span data-testid={`info-window-name-${index}`}>
                      {marker.name}
                    </span>
                    <br />
                    <span data-testid={`info-window-address-${index}`}>
                      {marker.address}
                    </span>
                    <br />
                    <span data-testid={`info-window-phone-${index}`}>
                      {marker.phone}
                    </span>
                    <br />
                    <span data-testid={`info-window-type-${index}`}>
                      {marker.type}
                    </span>
                  </b>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
