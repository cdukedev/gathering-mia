import React from "react";
import Deliveries from "../../MapDeliveryComponents/Deliveries/Deliveries";

const DeliveriesWrapper = ({ handleMenuClick, handleDeliveryClick }) => (
  <div className="deliveries">
    <Deliveries
      handleMenuClick={handleMenuClick}
      handleDeliveryClick={handleDeliveryClick}
    />
  </div>
);

export default DeliveriesWrapper;
