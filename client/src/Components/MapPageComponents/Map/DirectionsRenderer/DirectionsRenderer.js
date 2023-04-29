import React, { useEffect } from "react";

const DirectionsRenderer = ({ map, origin, destination }) => {
  useEffect(() => {
    if (!map || !origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [map, origin, destination]);

  return null;
};

export default DirectionsRenderer;
