import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import foodBank from "../../../../assets/icons/foodbank.svg";
import communityGarden from "../../../../assets/icons/community-garden.svg";

const Map = (props) => {
  const initialMarkers = props.initialMarkers;
  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [markers] = useState(initialMarkers);
  const containerStyle = {
    width: "100vw",
    height: `${props.height}`,
  };

  const center = {
    lat: parseFloat(props.coords.lat),
    lng: parseFloat(props.coords.lng),
  };

  const createMapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  const mapClicked = (event) => {
    event.preventDefault();
    console.log(event.latLng.lat(), event.latLng.lng());
  };

  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    console.log(marker, index);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={createMapOptions}
        center={center}
        zoom={12}
        onClick={mapClicked}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            // position will be displayed if the filter toggle is true
            position={
              marker.type === "Food Bank" && props.foodBankToggle
                ? marker.position
                : marker.type === "Community Garden" &&
                  props.communityGardenToggle
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
            onClick={(event) => markerClicked(marker, index, event)}
          >
            {activeInfoWindow === index && (
              <InfoWindow position={marker.position}>
                <b>
                  {marker.name}
                  <br />
                  {marker.address}
                  <br />
                  {marker.phone}
                  <br />
                  {marker.type}
                </b>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
