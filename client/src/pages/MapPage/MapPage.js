import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./MapPage.scss";
import MapMenu from "./MapPageComponents/MapMenu/MapMenu";
import Map from "./MapPageComponents/Map/Map";
import MapHelp from "./MapPageComponents/MapHelp/MapHelp";
import MapFilter from "./MapPageComponents/MapFilter/MapFilter";
import MapDeliveries from "./MapPageComponents/MapDeliveries/MapDeliveries";
import Deliveries from "./MapPageComponents/MapDeliveryComponents/Deliveries/Deliveries";
import BackButton from "../../components/BackButton/BackButton";
import QRScanner from "./MapPageComponents/MapDeliveryComponents/QRScanner/QRScanner";
import Splash from "../../components/Splash/Splash";
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
    <React.Fragment>
      {!coords && <Splash handleGeolocation={handleGeolocationRequest} />}

      {coords && (
        <div className="map-page">
          {menu === "mapDeliveries" && (
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
          )}

          {menu === "deliveries" && (
            <div className="deliveries">
              <Deliveries
                handleMenuClick={handleMenuClick}
                handleDeliveryClick={handleDeliveryClick}
              />
            </div>
          )}

          {menu === "mapHelp" && (
            <div className="map-help">
              <Map height="calc(100vh - 135px)" />
              <MapHelp handleMenuClick={handleMenuClick} />
              <BackButton />
            </div>
          )}

          {menu === "mapFilter" && (
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
          )}

          {menu === "defaultMenu" && (
            <div className="map-container">
              <Map height="calc(100vh - 50px)" />
              <MapMenu handleMenuClick={handleMenuClick} />
              <BackButton />
            </div>
          )}

          {menu === "qrScanner" && (
            <div className="QR-scanner">
              <QRScanner />
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MapPage;
