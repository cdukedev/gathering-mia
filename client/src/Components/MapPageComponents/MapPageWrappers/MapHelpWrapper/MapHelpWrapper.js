import React from "react";
import Map from "../../Map/Map";
import MapHelp from "../../MapHelp/MapHelp";
import BackButton from "../../../BackButton/BackButton";

const MapHelpWrapper = ({ handleMenuClick }) => (
  <div className="map-help">
    <Map height="calc(100vh - 135px)" />
    <MapHelp handleMenuClick={handleMenuClick} />
    <BackButton />
  </div>
);

export default MapHelpWrapper;
