const fs = require("fs");

/**
 * Converts the zone and id properties of each recipient in the given recipients array to integers.
 * @param {Array} recipients - The array containing the recipients' data.
 * @return {Array} - The modified recipients array with integer values for zone and id.
 */
// function convertZoneAndIdToInt(recipients) {
//   return recipients.map((recipient) => {
//     return {
//       ...recipient,
//       zone: parseInt(recipient.zone, 10),
//       id: parseInt(recipient.id, 10),
//     };
//   });
// }

// Uncomment the code below if you want to use the `convertZoneAndIdToInt` function

// const recipientsWithIntZoneAndId = convertZoneAndIdToInt(recipients);

// Write the updated recipients data back to the JSON file
// fs.writeFile(
//   "socialLinks.json",
//   JSON.stringify(socialLinks, null, 2),
//   (err) => {
//     if (err) {
//       console.error("Error writing recipients.json:", err);
//       return;
//     }
//   }
// );

/**
 * Converts the coordinates in the given jsonData to integers with the specified number of decimal points.
 * @param {Array} jsonData - The JSON array containing the coordinates.
 * @param {number} decimalPoints - The number of decimal points to round to (default is 7).
 * @return {Array} - The modified jsonData with rounded coordinates.
 */
function convertCoordinatesToInt(jsonData, decimalPoints = 7) {
  jsonData.forEach((entry) => {
    entry.position.lat = Number(
      parseFloat(entry.position.lat).toFixed(decimalPoints)
    );
    entry.position.lng = Number(
      parseFloat(entry.position.lng).toFixed(decimalPoints)
    );
  });
  return jsonData;
}

const data = [
  {
    id: "1",
    name: "Food For Life Network",
    position: { lat: 25.8017556, lng: -80.2035881 },
    address: "3510 Biscayne Blvd, Miami, FL 33137",
    type: "Food Bank",
    zone: "1",
    phone: "(305) 576-3663",
  },
  {
    id: "2",
    name: "Saint John Baptist Church",
    position: { lat: 25.78734, lng: -80.20012 },
    address: "1328 NW 3rd Ave, Miami, FL 33136",
    type: "Food Bank",
    zone: "2",
    phone: "(305) 372-3877",
  },
  {
    id: "3",
    name: "Feeding South Florida",
    position: { lat: 25.98715, lng: -80.17347 },
    address: "2501 SW 32nd Terrace, Pembroke Park, FL 33023",
    type: "Food Bank",
    zone: "3",
    phone: "(954) 518-1818",
  },
  {
    id: "4",
    name: "Farm Share",
    position: { lat: 26.233641, lng: -80.139748 },
    address: "1255 W Atlantic Blvd, Pompano Beach, FL 33069",
    type: "Food Bank",
    zone: "1",
    phone: "(954) 942-6785",
  },
  {
    id: "5",
    name: "Glory Temple Ministries",
    position: { lat: 25.847023, lng: -80.233667 },
    address: "7950 NW 22 Avenue, Miami, FL 33147",
    type: "Food Bank",
    zone: "2",
    phone: "(305) 456-5216",
  },
  {
    id: "6",
    name: "Curleys House of Style",
    position: { lat: 25.830699, lng: -80.20648 },
    address: "6025 N.W. 6 Court, Miami, FL 33127",
    type: "Food Bank",
    zone: "3",
    phone: "(305) 759-9805",
  },
  {
    id: "7",
    name: "Mt Pisgah Seventh-day Adventist Church",
    position: { lat: 25.9712261, lng: -80.2568991 },
    address: "3340 NW 215th St, Miami Gardens, FL 33056",
    type: "Food Bank",
    zone: "1",
    phone: "(305) 624-0679",
  },
  {
    id: "8",
    name: "Glory Temple Ministries",
    position: { lat: 26.233641, lng: -80.139748 },
    address: "7950 NW 22 Avenue Miami, FL 33147",
    type: "Food Bank",
    zone: "2",
    phone: "(305) 456-5216",
  },

  {
    id: "9",
    name: "Harvest Fire Worship Center",
    position: { lat: 25.9408686, lng: -80.2390172 },
    address: "18291 NW 23rd Ave #3757, Miami Gardens, FL 33056",
    type: "Food Bank",
    zone: "3",
    phone: "(305) 620-2986",
  },
  {
    id: "10",
    name: "Volunteers of America of FL",
    position: { lat: 25.7731991, lng: -80.2194653 },
    address: "1492 W Flagler Street Miami, FL 33135",
    type: "Food Bank",
    zone: "1",
    phone: "(305) 644-0335",
  },
  {
    id: "11",
    name: "Miami Peniel Church Nazarene",
    position: { lat: 25.8288133, lng: -80.1917071 },
    address: "5801 NE 2nd Ave Miami, FL 33137",
    type: "Food Bank",
    zone: "2",
    phone: "(305) 770-1960",
  },
];

// convert "data" to JavaScript array of objects, remove the id fields and position fields and add a lat and lng field with the coordinates from the position field converted to numbers.

// const convertedData = convertCoordinatesToInt(data);
// console.log(JSON.stringify(convertedData));
