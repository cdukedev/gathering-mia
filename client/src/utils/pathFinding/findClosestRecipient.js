import calculateDistance from "./calculateDistance";

/**
 * Finds the closest recipient based on current location and final destination.
 * @param {Array} recipients - An array of recipient objects.
 * @param {object} currentLocation - The current location object with latitude and longitude.
 * @param {object} finalDestination - The final destination object with latitude and longitude.
 * @returns {object|null} - The closest recipient object, or null if no recipients are provided.
 */
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

    // Check if the current recipient is closer than the previous closest recipient
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
