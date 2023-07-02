import { calculateDistance, findClosestRecipient } from "../pathFinding";

export default function findOptimalPath(
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
