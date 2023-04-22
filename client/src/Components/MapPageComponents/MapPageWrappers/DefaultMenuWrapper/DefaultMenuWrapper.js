import React from "react";
import Map from "../../Map/Map";
import MapMenu from "../../MapMenu/MapMenu";
import BackButton from "../../../BackButton/BackButton";

const DefaultMenuWrapper = ({ handleMenuClick }) => (
  <div className="map-container" data-testid="map-container">
    <Map height="calc(100vh - 50px)" />
    <MapMenu handleMenuClick={handleMenuClick} />
    <BackButton />
  </div>
);

export default DefaultMenuWrapper;
