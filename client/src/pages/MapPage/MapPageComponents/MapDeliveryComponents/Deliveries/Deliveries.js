import React, { useEffect, useContext, useState } from "react";

import "./Deliveries.scss";
import { MapPageContext } from "../../../../../context/MapPageContext";
function Deliveries() {
  const [sortedrecipients, setSortedRecipients] = useState([]);
  const [finalDestination, setFinalDestination] = useState({
    lat: 25.2801423,
    lng: -80.6620736,
  });
  const {
    recipients,
    coords,
    position,
    zone,
    handleMenuClick,
    handleGeolocationRequest,
  } = useContext(MapPageContext);
  useEffect(() => {
    handleGeolocationRequest();
  }, [handleGeolocationRequest]);
  useEffect(() => {
    const calculateDistance = (centerLocation, recipient) => {
      console.log("centerLocation", centerLocation);
      console.log("recipient", recipient);
      if (!recipient) {
        return null;
      }

      const { lat, lng } = centerLocation;
      const { lat: recipientLat, lng: recipientLng } = recipient;

      const distance = Math.sqrt(
        Math.pow(lat - recipientLat, 2) + Math.pow(lng - recipientLng, 2)
      );
      return { distance };
    };

    recipients.map((recipient) => {
      const distanceObj = calculateDistance(coords, recipient.position);

      if (distanceObj) {
        let distance = distanceObj.distance * 69.2;

        if (distance < 10) {
          recipient.distance = Math.round(distance * 10) / 10;
        } else {
          recipient.distance = Math.round(distance);
        }
      } else {
        recipient.distance = null;
      }

      return recipient;
    });

    setSortedRecipients(
      recipients.sort((a, b) => {
        return a.distance - b.distance;
      })
    );
  }, [recipients, coords, position]);

  return (
    <div className="deliveries__container">
      <h3 className="deliveries__top-row--header">
        Deliver in the order given for the shortest total trip.
      </h3>
      <div className="deliveries__top-row--recipient--container">
        {sortedrecipients.map((recipient) => {
          console.log(recipient.zone);
          console.log(zone);
          if (recipient.zone === zone) {
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
          } else {
            return null;
          }
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
export default Deliveries;
