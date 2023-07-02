import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipientContext } from "../../../../contexts/RecipientContext";

function Recipient({ recipient, coords }) {
  const navigate = useNavigate();
  const { setCurrentRecipient } = useContext(RecipientContext);

  const handleRecipientClick = (e) => {
    console.log("recipient clicked");
    setCurrentRecipient(recipient);
    // Open a separate window with Google Maps directions
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${recipient.position.lat},${recipient.position.lng}&travelmode=driving`,
      "_blank"
    );
    navigate(
      `/directions/${coords.lat}/${coords.lng}/${recipient.position.lat}/${recipient.position.lng}`
    );

    // Navigate to the DirectionsMap Component without react router dom
  };

  return (
    <div className="deliveries__top-row--recipient--radius" key={recipient.id}>
      <div className="deliveries__top-row--recipient">
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
          <div
            className="deliveries__top-row--recipient-right--directions"
            onClick={handleRecipientClick}
          >
            Get Directions
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipient;
