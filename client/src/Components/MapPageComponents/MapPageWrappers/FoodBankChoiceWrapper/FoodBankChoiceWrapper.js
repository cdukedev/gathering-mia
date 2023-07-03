import React from "react";
import Map from "../../Map/Map";
import FoodBankChoice from "../../FoodBanksChoice/FoodBankChoice";
import BackButton from "../../../BackButton/BackButton";

const FoodBankChoiceWrapper = ({
  handleMenuClick,
  handleDeliveryClick,
  foodBanks,
  coords,
}) => (
  <div className="map-deliveries">
    <Map height="calc(100vh - 280px)" />
    <FoodBankChoice
      handleMenuClick={handleMenuClick}
      handleDeliveryClick={handleDeliveryClick}
      foodBanks={foodBanks}
      coords={coords}
    />
    <BackButton />
  </div>
);

export default FoodBankChoiceWrapper;
