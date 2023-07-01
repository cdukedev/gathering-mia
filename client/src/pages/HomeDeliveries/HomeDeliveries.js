import React, { useEffect, useContext, useState } from "react";
import "./HomeDeliveries.scss";
import { Link } from "react-router-dom";
import { RecipientContext } from "../../contexts/RecipientContext";
import { GeolocationContext } from "../../contexts/GeolocationContext";
import HomeDeliveriesSplash from "./HomeDeliveriesSplash";
import RecipientsList from "../../Components/MapPageComponents/HomeDeliveryComponents/RecipientsList/RecipientsList";

function HomeDeliveries() {
  // State
  const [finalDestination, setFinalDestination] = useState({
    lat: 24.2801423,
    lng: -80.6620736,
  }); //Plans: In the future, the finalDestination will be set by the user prior to making their deliveries, their destionation will be stored so that when they log in their destination can be loaded as the default.
  const [deliveryCapacity, setDeliveryCapacity] = useState(9); //Plans: In the future, the capacity will be set by the user in their profile.
  const [sortedRecipients, setSortedRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Context
  const { handleGeolocationRequest, coords } = useContext(GeolocationContext);
  const { recipients, loadingRecipients } = useContext(RecipientContext);

  const zone = 1;

  useEffect(() => {
    const fetchCoords = async () => {
      await handleGeolocationRequest();
    };
    fetchCoords();
  }, [handleGeolocationRequest]);

  useEffect(() => {
    if (!loadingRecipients) {
      setSortedRecipients((prevRecipients) => {
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

  function findOptimalPath(
    recipients,
    currentLocation,
    finalDestination,
    capacity,
    zone
  ) {
    let optimalPath = [];
    // filter all recipients by zone
    let filteredRecipients = recipients.filter(
      (recipient) => recipient.zone === zone
    );
    let remainingRecipients = [...filteredRecipients];
    for (
      let i = 0;
      i < remainingRecipients.length && capacity > optimalPath.length;
      i++
    ) {
      let count = 0;
      let closestRecipient = findClosestRecipient(
        remainingRecipients,
        currentLocation,
        finalDestination
      );

      closestRecipient.distance = calculateDistance(
        currentLocation,
        closestRecipient.position
      );

      optimalPath.push(closestRecipient);

      remainingRecipients = remainingRecipients.filter(
        (recipient) => recipient.id !== closestRecipient.id
      );

      currentLocation = closestRecipient.position;
      count = count + 1;
    }
    return optimalPath;
  }

  /**
   * Finds the closest recipient to the current location
   * @param {*} recipients
   * @param {*} currentLocation
   * @param {*} finalDestination
   * @returns
   */

  function findClosestRecipient(recipients, currentLocation, finalDestination) {
    let closest;

    for (let recipient of recipients) {
      const distanceToRecipient = calculateDistance(
        currentLocation,
        recipient.position
      );
      const distanceToFinalDestination = calculateDistance(
        recipient.position,
        finalDestination
      );

      if (
        !closest ||
        (distanceToRecipient <
          calculateDistance(currentLocation, closest.position) &&
          distanceToFinalDestination <
            calculateDistance(closest.position, finalDestination))
      ) {
        closest = recipient;
      }
    }

    return closest;
  }
  function calculateDistance(locationA, locationB) {
    // Check if locations are valid
    if (!locationA || !locationB) return null;
    const { lat: latA, lng: lngA } = locationA;
    const { lat: latB, lng: lngB } = locationB;

    // Check if lat and lng are numbers
    if (
      typeof latA !== "number" ||
      typeof lngA !== "number" ||
      typeof latB !== "number" ||
      typeof lngB !== "number"
    ) {
      return null;
    }

    // Calculate distance in km
    const distanceInKm = Math.sqrt(
      Math.pow(latA - latB, 2) + Math.pow(lngA - lngB, 2)
    );

    // Convert km to miles
    const distanceInMiles = distanceInKm * 0.621371;

    return distanceInMiles < 10
      ? Math.round(distanceInMiles * 10) / 10
      : Math.round(distanceInMiles);
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
          <RecipientsList recipients={recipients} coords={coords} />
          <Link to="/">
            <button className="top-row-button">
              Click Here to confirm that all deliveries have been completed.
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeDeliveries;
