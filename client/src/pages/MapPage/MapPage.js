import React, { useContext } from "react";
import MapDeliveriesWrapper from "../../Components/MapPageComponents/MapPageWrappers/MapDeliveriesWrapper/MapDeliveriesWrapper";
import Splash from "../../Components/Splash/Splash";
import DeliveriesWrapper from "../../Components/MapPageComponents/MapPageWrappers/DeliveriesWrapper/DeliveriesWrapper";
import MapHelpWrapper from "../../Components/MapPageComponents/MapPageWrappers/MapHelpWrapper/MapHelpWrapper";
import DefaultMenuWrapper from "../../Components/MapPageComponents/MapPageWrappers/DefaultMenuWrapper/DefaultMenuWrapper";
import MapFilterWrapper from "../../Components/MapPageComponents/MapPageWrappers/MapFilterWrapper/MapFilterWrapper";
import QrScanner from "../../Components/MapPageComponents/MapDeliveryComponents/QRScanner/QRScanner";
import { MapPageContext } from "../../context/MapPageContext";

const MapPage = () => {
  const {
    menu,
    coords,
    foodBanks,
    foodBankToggle,
    communityGardenToggle,
    handleMenuClick,
    handleDeliveryClick,
    handleFoodBankToggle,
    handleCommunityGardenToggle,
    handleGeolocationRequest,
  } = useContext(MapPageContext);

  return (
    <>
      {!coords && <Splash handleGeolocation={handleGeolocationRequest} />}

      {coords && (
        <div className="map-page">
          {menu === "mapDeliveries" && (
            <MapDeliveriesWrapper
              handleMenuClick={handleMenuClick}
              handleDeliveryClick={handleDeliveryClick}
              foodBanks={foodBanks}
              coords={coords}
            />
          )}

          {menu === "deliveries" && (
            <DeliveriesWrapper
              handleMenuClick={handleMenuClick}
              handleDeliveryClick={handleDeliveryClick}
            />
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
