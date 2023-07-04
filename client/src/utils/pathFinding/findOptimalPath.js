import { calculateDistance, findClosestRecipient } from "../pathFinding";

/**
 * Finds the optimal path based on recipients, current location, final destination, capacity, and zone.
 * @param {Array} recipients - An array of recipient objects.
 * @param {object} currentLocation - The current location object with latitude and longitude.
 * @param {object} finalDestination - The final destination object with latitude and longitude.
 * @param {number} capacity - The maximum capacity for the path.
 * @param {string} zone - The zone to filter recipients by.
 * @returns {Array} - An array of recipient objects representing the optimal path.
 */
export default function findOptimalPath(
  recipients,
  currentLocation,
  finalDestination,
  capacity,
  zone
) {
  let optimalPath = [];

  // Filter recipients by zone
  let filteredRecipients = recipients.filter(
    (recipient) => recipient.zone === zone
  );

  let remainingRecipients = [...filteredRecipients];

  // Iterate until capacity is reached or there are no more recipients
  for (
    let i = 0;
    i < remainingRecipients.length && capacity > optimalPath.length;
    i++
  ) {
    let count = 0;

    // Find the closest recipient to the current location
    let closestRecipient = findClosestRecipient(
      remainingRecipients,
      currentLocation,
      finalDestination
    );

    // Calculate the distance between the current location and the closest recipient's position
    closestRecipient.distance = calculateDistance(
      currentLocation,
      closestRecipient.position
    );

    // Add the closest recipient to the optimal path
    optimalPath.push(closestRecipient);

    // Remove the closest recipient from the remaining recipients
    remainingRecipients = remainingRecipients.filter(
      (recipient) => recipient.id !== closestRecipient.id
    );

    // Update the current location to the position of the closest recipient
    currentLocation = closestRecipient.position;

    count = count + 1;
  }

  return optimalPath;
}
