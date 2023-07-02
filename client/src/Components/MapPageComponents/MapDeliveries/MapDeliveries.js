import React, { useContext } from "react";
import "./MapDeliveries.scss";
import MapMenuArrow from "../../../assets/icons/map-menu-arrow.svg";
import { MapPageContext } from "../../../contexts/MapPageContext";
import { GeolocationContext } from "../../../contexts/GeolocationContext";
import { RecipientContext } from "../../../contexts/RecipientContext";
import { FoodBankContext } from "../../../contexts/FoodBankContext";
import { useNavigate } from "react-router-dom";

function MapDeliveries() {
  const { handleMenuClick } = useContext(MapPageContext);
  const { coords } = useContext(GeolocationContext); // Consume GeolocationContext
  const { foodBanks } = useContext(FoodBankContext); // Consume FoodBankContext
  const { handleDeliveryClick } = useContext(RecipientContext);

  const navigate = useNavigate();

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
                        handleDeliveryClick("qrScanner", foodBank.zone);
                        navigate(
                          `/directions/${coords.lat}/${coords.lng}/${foodBank.position.lat}/${foodBank.position.lng}`
                        );
                      }}
                    >
                      Get Directions
                    </button>
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
