import React, { useEffect, useContext, useState } from "react";
import "./Deliveries.scss";
import { MapPageContext } from "../../../../../context/MapPageContext";

function Deliveries() {
  const [sortedRecipients, setSortedRecipients] = useState([]);
  const [finalDestination, setFinalDestination] = useState({
    lat: 24.2801423,
    lng: -80.6620736,
  });
  const [capacity, setCapacity] = useState(9);
  const [loading, setLoading] = useState(true);

  const {
    recipients,
    coords,
    zone,
    handleMenuClick,
    handleGeolocationRequest,
  } = useContext(MapPageContext);

  useEffect(() => {
    handleGeolocationRequest();
  }, [handleGeolocationRequest]);

  useEffect(() => {
    setSortedRecipients(
      findOptimalPath(recipients, coords, finalDestination, capacity, zone)
    );
    setLoading(false);
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
      (recipient) => recipient.zone == zone
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

  function findClosestRecipient(recipients, currentLocation, finalDestination) {
    return recipients.reduce((closest, recipient) => {
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
        return recipient;
      }

      return closest;
    }, null);
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

    const distance = Math.sqrt(
      Math.pow(latA - latB, 2) + Math.pow(lngA - lngB, 2)
    );

    return distance < 10
      ? Math.round(distance * 10) / 10
      : Math.round(distance);
  }

  if (loading) {
    return <div>Loading...</div>;
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
                        href={`https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${recipient.position.lat},${recipient.position.lng}`}
                      >
                        Get Directions!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="top-row-button"
            onClick={() => {
              alert("Thank you for completing your deliveries!");
              handleMenuClick("defaultMenu");
            }}
          >
            Click Here to confirm that all deliveries have been completed.
          </button>
        </div>
      </div>
    );
  }
}

export default Deliveries;
