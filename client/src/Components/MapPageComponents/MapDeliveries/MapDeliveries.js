import React, { useContext, useState } from "react";
import "./MapDeliveries.scss";
import MapMenuArrow from "../../../assets/icons/map-menu-arrow.svg";
import { MapPageContext } from "../../../context/MapPageContext";
import Map from "../Map/Map";
import QrScanner from "../MapDeliveryComponents/QRScanner/QRScanner";

function MapDeliveries() {
  const { coords, foodBanks, handleMenuClick, handleDeliveryClick } =
    useContext(MapPageContext);

  const [selectedFoodBank, setSelectedFoodBank] = useState(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

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
                    <button
                      className="map-deliveries__top-row--food-bank-right--directions"
                      onClick={() => {
                        setSelectedFoodBank(foodBank);
                      }}
                    >
                      Get Directions
                    </button>
                    <button
                      className="map-deliveries__top-row--food-bank-right--arrived"
                      onClick={() => {
                        handleDeliveryClick("qrScanner", foodBank.zone);
                        setShowQRScanner(true);
                      }}
                    >
                      Arrived at Food Bank
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showQRScanner && <QrScanner />}
    </div>
  );
}

export default MapDeliveries;
