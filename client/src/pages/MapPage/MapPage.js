import React, { useContext } from "react";
import FoodBankChoiceWrapper from "../../Components/MapPageComponents/MapPageLayoutWrappers/FoodBankChoiceWrapper/FoodBankChoiceWrapper";
import Splash from "../../Components/Splash/Splash";
import DeliveriesWrapper from "../../Components/MapPageComponents/MapPageLayoutWrappers/DeliveriesWrapper/DeliveriesWrapper";
import MapHelpWrapper from "../../Components/MapPageComponents/MapPageLayoutWrappers/MapHelpWrapper/MapHelpWrapper";
import DefaultMenuWrapper from "../../Components/MapPageComponents/MapPageLayoutWrappers/DefaultMenuWrapper/DefaultMenuWrapper";
import MapFilterWrapper from "../../Components/MapPageComponents/MapPageLayoutWrappers/MapFilterWrapper/MapFilterWrapper";
import QrScanner from "../../Components/MapPageComponents/HomeDeliveryComponents/QRScanner/QRScanner";
import { MapPageContext } from "../../contexts/MapPageContext";
import { GeolocationContext } from "../../contexts/GeolocationContext";
import { FoodBankContext } from "../../contexts/FoodBankContext";
import { CommunityGardenContext } from "../../contexts/CommunityGardenContext";

const MapPage = () => {
  const { menu, handleMenuClick } = useContext(MapPageContext);

  const { coords, handleGeolocationRequest } = useContext(GeolocationContext);

  const { foodBanks, foodBankToggle, handleFoodBankToggle } =
    useContext(FoodBankContext);

  const { communityGardenToggle, handleCommunityGardenToggle } = useContext(
    CommunityGardenContext
  );

  return (
    <>
      {!coords && <Splash handleGeolocation={handleGeolocationRequest} />}

      {coords && (
        <div className="map-page">
          {menu === "FoodBankChoice" && (
            <FoodBankChoiceWrapper
              handleMenuClick={handleMenuClick}
              foodBanks={foodBanks}
              coords={coords}
            />
          )}

          {menu === "deliveries" && (
            <DeliveriesWrapper handleMenuClick={handleMenuClick} />
          )}

          {menu === "mapHelp" && (
            <MapHelpWrapper handleMenuClick={handleMenuClick} />
          )}

          {menu === "mapFilter" && (
            <MapFilterWrapper
              handleCommunityGardenToggle={handleCommunityGardenToggle}
              handleFoodBankToggle={handleFoodBankToggle}
              handleMenuClick={handleMenuClick}
              foodBankToggle={foodBankToggle}
              communityGardenToggle={communityGardenToggle}
            />
          )}

          {menu === "defaultMenu" && (
            <DefaultMenuWrapper handleMenuClick={handleMenuClick} />
          )}

          {menu === "qrScanner" && <QrScanner />}
        </div>
      )}
    </>
  );
};

export default MapPage;
