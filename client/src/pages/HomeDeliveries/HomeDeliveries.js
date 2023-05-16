import React, { useEffect, useContext, useState } from "react";
import "./HomeDeliveries.scss";
import { Link } from "react-router-dom";
import { RecipientContext } from "../../contexts/RecipientContext";
import { GeolocationContext } from "../../contexts/GeolocationContext";
import HomeDeliveriesSplash from "./HomeDeliveriesSplash";

function HomeDeliveries() {
  const [sortedRecipients, setSortedRecipients] = useState([]);

  //Plans: In the future, the finalDestination will be set by the user prior to making their deliveries, their destionation will be stored so that when they log in their destination can be loaded as the default.
  const [finalDestination, setFinalDestination] = useState({
    lat: 24.2801423,
    lng: -80.6620736,
  });

  //Plans: In the future, the capacity will be set by the user in their profile.
  const [capacity, setCapacity] = useState(9);

  const [loading, setLoading] = useState(true);

  const { handleGeolocationRequest, coords } = useContext(GeolocationContext);

  const { recipients } = useContext(RecipientContext);

  const zone = 1;
  useEffect(() => {
    const fetchCoords = async () => {
      await handleGeolocationRequest();
    };
    fetchCoords();
  }, [handleGeolocationRequest]);

  useEffect(() => {
    if (coords) {
      setSortedRecipients(
        findOptimalPath(recipients, coords, finalDestination, capacity, zone)
      );
      setLoading(false);
    }
  }, [recipients, coords, finalDestination]);

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
    while (remainingRecipients.length > 0 && capacity > optimalPath.length) {
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
      console.log("distanceToFinalDestination", distanceToFinalDestination);
      console.log("distanceToRecipient", distanceToRecipient);

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
    if (!locationA || !locationB) return null;

    const { lat: latA, lng: lngA } = locationA;
    const { lat: latB, lng: lngB } = locationB;

    if (
      typeof latA !== "number" ||
      typeof lngA !== "number" ||
      typeof latB !== "number" ||
      typeof lngB !== "number"
    ) {
      return null;
    }

    const distanceInKm = Math.sqrt(
      Math.pow(latA - latB, 2) + Math.pow(lngA - lngB, 2)
    );

    // Convert km to miles
    const distanceInMiles = distanceInKm * 0.621371;

    return distanceInMiles < 10
      ? Math.round(distanceInMiles * 10) / 10
      : Math.round(distanceInMiles);
  }

  if (loading || !coords || !sortedRecipients.length) {
    return <HomeDeliveriesSplash />;
  } else {
    return (
      <div className="deliveries__container">
        <h3 className="deliveries__top-row--header">
          Deliver in the order given for the shortest total trip.
        </h3>
        <div className="deliveries__top-row--recipient--container">
          {sortedRecipients.map((recipient) => {
            return (
              <div
                className="deliveries__top-row--recipient--radius"
                key={recipient.id}
              >
                <div
                  className="deliveries__top-row--recipient"
                  key={recipient.id}
                >
                  <div className="deliveries__top-row--recipient-left">
                    <div className="deliveries__top-row--recipient--item deliveries__top-row--recipient-left--name">
                      {recipient.name}
                    </div>
                    <div className="deliveries__top-row--recipient--item deliveries__top-row--recipient-left--address">
                      {recipient.address}
                    </div>
                    <div className="deliveries__top-row--recipient--item deliveries__top-row--recipient-left--phone">
                      {recipient.phone}
                    </div>
                  </div>
                  <div className="deliveries__top-row--recipient-right">
                    <div className="deliveries__top-row--recipient--item deliveries__top-row--recipient-right--distance">
                      {recipient.distance} miles
                    </div>
                    <div>
                      <a
                        className="deliveries__top-row--recipient-right--directions"
                        // open in new tab
                        //add an alert that the directions are being opened in a new tab
                        onClick={() => {
                          alert(
                            "Directions are being opened in a new page, you will need to return to this page to continue deliveries."
                          );
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${recipient.position.lat},${recipient.position.lng}&travelmode=driving`}
                      >
                        Get Directions!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
