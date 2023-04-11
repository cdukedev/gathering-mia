import React, { useContext } from "react";
import "./MapDeliveries.scss";
import MapMenuArrow from "../../../../assets/icons/map-menu-arrow.svg";
import { MapPageContext } from "../../../../context/MapPageContext";

function MapDeliveries() {
  const { coords, foodBanks, handleMenuClick, handleDeliveryClick } =
    useContext(MapPageContext);

  const calculateDistance = (centerLocation, foodBank) => {
    const { lat, lng } = centerLocation;
    const { lat: foodBankLat, lng: foodBankLng } = foodBank;
    const distance = Math.sqrt(
      Math.pow(lat - foodBankLat, 2) + Math.pow(lng - foodBankLng, 2)
    );
    return { distance };
  };

  foodBanks.map((foodBank) => {
    if (coords) {
      let distance = calculateDistance(coords, foodBank.position);
      distance = distance.distance * 69.2;
      if (distance < 10) {
        foodBank.distance = Math.round(distance * 10) / 10;
      } else {
        foodBank.distance = Math.round(distance);
      }
    } else {
      foodBank.distance = undefined;
    }
    return foodBank;
  });

  const sortedFoodBanks = foodBanks.sort((a, b) => {
    return a.distance - b.distance;
  });

  return (
    <div className="map-deliveries__container">
      <div className="map-deliveries__top-row">
        <img
          className="map-deliveries__top-row--arrow"
          onClick={() => {
            handleMenuClick("defaultMenu");
          }}
          src={MapMenuArrow}
          alt="menu arrow to close helper"
        />
      </div>
      <h3 className="map-deliveries__top-row--header">
        Select a location to begin delivering
      </h3>
      <div className="map-deliveries__top-row--food-bank--container">
        {sortedFoodBanks.map((foodBank) => {
          return (
            <div
              className="map-deliveries__top-row--food-bank--radius"
              key={foodBank.id}
            >
              <div
                className="map-deliveries__top-row--food-bank"
                key={foodBank.id}
              >
                <div className="map-deliveries__top-row--food-bank-left">
                  <div className="map-deliveries__top-row--food-bank--item map-deliveries__top-row--food-bank-left--name">
                    {foodBank.name}
                  </div>
                  <div className="map-deliveries__top-row--food-bank--item map-deliveries__top-row--food-bank-left--address">
                    {foodBank.address}
                  </div>
                  <div className="map-deliveries__top-row--food-bank--item map-deliveries__top-row--food-bank-left--phone">
                    {foodBank.phone}
                  </div>
                </div>
                <div className="map-deliveries__top-row--food-bank-right">
                  <div className="map-deliveries__top-row--food-bank--item map-deliveries__top-row--food-bank-right--distance">
                    {foodBank.distance
                      ? `${foodBank.distance} miles`
                      : "Loading..."}
                  </div>
                  <div>
                    <a
                      className="map-deliveries__top-row--food-bank-right--directions"
                      onClick={() => {
                        alert(
                          "Directions are being opened in a new page, you will need to return to this page once you have arrived at the food bank"
                        );
                        handleDeliveryClick("qrScanner", foodBank.zone);
                      }}
                      zone={foodBank.zone}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${foodBank.position.lat},${foodBank.position.lng}`}
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MapDeliveries;
