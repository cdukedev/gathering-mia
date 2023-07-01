import React from "react";

function Recipient({ recipient, coords }) {
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
          <div>
            <a
              className="deliveries__top-row--recipient-right--directions"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${recipient.position.lat},${recipient.position.lng}&travelmode=driving`}
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipient;
