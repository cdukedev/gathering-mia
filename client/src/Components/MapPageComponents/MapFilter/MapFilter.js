import React, { useContext } from "react";
import "./MapFilter.scss";
import MapMenuArrow from "../../../assets/icons/map-menu-arrow.svg";
import FilterOn from "../../../assets/icons/filter-on.svg";
import FilterOff from "../../../assets/icons/filter-off.svg";
import { MapPageContext } from "../../../contexts/MapPageContext";
import { CommunityGardenContext } from "../../../contexts/CommunityGardenContext";
import { FoodBankContext } from "../../../contexts/FoodBankContext";

function MapFilter() {
  const { menu, handleMenuClick } = useContext(MapPageContext);
  const { communityGardenToggle, handleCommunityGardenToggle } = useContext(
    CommunityGardenContext
  );
  const { foodBankToggle, handleFoodBankToggle } = useContext(FoodBankContext);

  return (
    <div className="map-filter__container">
      <div className="map-filter__text">
        <div className="map-filter__top-row">
          <img
            className="map-filter__top-row--arrow"
            onClick={() => {
              handleMenuClick("defaultMenu");
            }}
            src={MapMenuArrow}
            alt="menu arrow to close helper"
          />
        </div>
        <div className="map-filter__bottom-container">
          <div
            className={
              foodBankToggle
                ? "map-filter__bottom-container--items"
                : "map-filter__bottom-container--items map-filter__bottom-container--items-off"
            }
            onClick={() => {
              handleFoodBankToggle();
            }}
          >
            <span className="map-filter__bottom-container--item-text">
              Food Pantries
            </span>
            <img
              className="map-filter__bottom-container--item"
              src={foodBankToggle ? FilterOn : FilterOff}
              alt="FoodBank Icon"
            />
          </div>
          <div
            className={
              communityGardenToggle
                ? "map-filter__bottom-container--items"
                : "map-filter__bottom-container--items map-filter__bottom-container--items-off"
            }
            onClick={() => {
              handleCommunityGardenToggle();
            }}
          >
            <span className="map-filter__bottom-container--item-text">
              Gardens
            </span>
            <img
              className="map-filter__bottom-container--item"
              src={communityGardenToggle ? FilterOn : FilterOff}
              alt="CommunityGarden Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapFilter;
