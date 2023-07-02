import calculateDistance from "./calculateDistance";

export default function findClosestRecipient(
  recipients,
  currentLocation,
  finalDestination
) {
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
