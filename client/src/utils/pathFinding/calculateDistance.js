export default function calculateDistance(locationA, locationB) {
  // Check if locations are valid
  if (!locationA || !locationB) return null;
  const { lat: latA, lng: lngA } = locationA;
  const { lat: latB, lng: lngB } = locationB;

  // Check if lat and lng are numbers
  if (
    typeof latA !== "number" ||
    typeof lngA !== "number" ||
    typeof latB !== "number" ||
    typeof lngB !== "number"
  ) {
    return null;
  }

  // Calculate distance in km
  const distanceInKm = Math.sqrt(
    Math.pow(latA - latB, 2) + Math.pow(lngA - lngB, 2)
  );

  // Convert km to miles
  const distanceInMiles = distanceInKm * 0.621371;

  return distanceInMiles < 10
    ? Math.round(distanceInMiles * 10) / 10
    : Math.round(distanceInMiles);
}
