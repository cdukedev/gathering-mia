import React, { useEffect, useContext, useState } from "react";
import "./HomeDeliveries.scss";
import { Link, useNavigate } from "react-router-dom";
import { RecipientContext } from "../../contexts/RecipientContext";
import { GeolocationContext } from "../../contexts/GeolocationContext";
import HomeDeliveriesSplash from "./HomeDeliveriesSplash";
import RecipientsList from "../../Components/MapPageComponents/HomeDeliveryComponents/RecipientsList/RecipientsList";
import { findOptimalPath } from "../../utils/pathFinding";
import DirectionsMap from "../DirectionsMap/DirectionsMap";

function HomeDeliveries() {
  // State
  const [finalDestination, setFinalDestination] = useState({
    lat: 24.2801423,
    lng: -80.6620736,
  }); //Plans: In the future, the finalDestination will be set by the user prior to making their deliveries, their destionation will be stored so that when they log in their destination can be loaded as the default.

  const [deliveryCapacity, setDeliveryCapacity] = useState(9); //Plans: In the future, the capacity will be set by the user in their profile.

  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();
  // Context
  const { handleGeolocationRequest, coords } = useContext(GeolocationContext);
  const {
    recipients,
    currentRecipient,
    loadingRecipients,
    sortedRecipients,
    setSortedRecipients,
    setCurrentRecipient,
  } = useContext(RecipientContext);

  const zone = 1;

  useEffect(() => {
    const fetchCoords = async () => {
      await handleGeolocationRequest();
    };
    fetchCoords();
  }, [handleGeolocationRequest]);

  useEffect(() => {
    if (currentRecipient || sortedRecipients.length === 0) {
      setLoading(false);
    }
    if (!loadingRecipients && !currentRecipient) {
      setSortedRecipients(() => {
        const newRecipients = findOptimalPath(
          recipients,
          coords,
          finalDestination,
          deliveryCapacity,
          zone
        );
        setLoading(false);
        return newRecipients;
      });
    }
  }, [recipients, loadingRecipients]);

  const handleFinishedDeliveryClick = (clicked, clickedZone) => {
    setSortedRecipients([]);
    setLoading(true);
    setCurrentRecipient(null);
    Navigate("/");
  };

  /**
   * Finds the closest recipient to the current location
   * @param {*} recipients
   * @param {*} currentLocation
   * @param {*} finalDestination
   * @returns
   */
  if (currentRecipient && !sortedRecipients.length) {
    return (
      <button className="top-row-button" onClick={handleFinishedDeliveryClick}>
        Thank you so much on behalf of those in our community for delivering
        today! Click Here to confirm that all deliveries have been completed.
      </button>
    );
  }
  if (loadingRecipients || loading || !coords || !sortedRecipients.length) {
    return <HomeDeliveriesSplash />;
  } else {
    return (
      <div className="deliveries__container">
        <h3 className="deliveries__top-row--header">
          Deliver in the order given for the shortest total trip.
        </h3>
        <div className="deliveries__top-row--recipient--container">
          <RecipientsList coords={coords} />
        </div>
      </div>
    );
  }
}

export default HomeDeliveries;
