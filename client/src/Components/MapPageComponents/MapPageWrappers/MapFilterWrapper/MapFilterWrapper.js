import React from "react";
import Map from "../../Map/Map";
import MapFilter from "../../MapFilter/MapFilter";
import BackButton from "../../../BackButton/BackButton.tsx";

const MapFilterWrapper = ({
  handleCommunityGardenToggle,
  handleFoodBankToggle,
  handleMenuClick,
  foodBankToggle,
  communityGardenToggle,
}) => (
  <div className="map-filter">
    <Map height="calc(100vh - 125px)" />
    <MapFilter
      handleCommunityGardenToggle={handleCommunityGardenToggle}
      handleFoodBankToggle={handleFoodBankToggle}
      handleMenuClick={handleMenuClick}
      foodBankToggle={foodBankToggle}
      communityGardenToggle={communityGardenToggle}
    />
    <BackButton />
  </div>
);

export default MapFilterWrapper;
