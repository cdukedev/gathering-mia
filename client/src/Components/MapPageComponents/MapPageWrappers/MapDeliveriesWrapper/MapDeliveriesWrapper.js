import React from "react";
import Map from "../../Map/Map";
import MapDeliveries from "../../MapDeliveries/MapDeliveries";
import BackButton from "../../../BackButton/BackButton";

const MapDeliveriesWrapper = ({
  handleMenuClick,
  handleDeliveryClick,
  foodBanks,
  coords,
}) => (
  <div className="map-deliveries">
    <Map height="calc(100vh - 280px)" />
    <MapDeliveries
      handleMenuClick={handleMenuClick}
      handleDeliveryClick={handleDeliveryClick}
      foodBanks={foodBanks}
      coords={coords}
    />
    <BackButton />
  </div>
);

export default MapDeliveriesWrapper;
