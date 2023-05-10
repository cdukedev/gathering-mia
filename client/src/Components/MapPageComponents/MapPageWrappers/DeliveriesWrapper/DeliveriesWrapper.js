import React from "react";
import HomeDeliveries from "../../../../pages/HomeDeliveries/HomeDeliveries";

const DeliveriesWrapper = ({ handleMenuClick, handleDeliveryClick }) => (
  <div className="deliveries">
    <HomeDeliveries
      handleMenuClick={handleMenuClick}
      handleDeliveryClick={handleDeliveryClick}
    />
  </div>
);

export default DeliveriesWrapper;
