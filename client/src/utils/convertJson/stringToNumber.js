const fs = require("fs");

// function convertZoneAndIdToInt(recipients) {
//   return recipients.map((recipient) => {
//     return {
//       ...recipient,
//       zone: parseInt(recipient.zone, 10),
//       id: parseInt(recipient.id, 10),
//     };
//   });
// }

// const recipientsWithIntZoneAndId = convertZoneAndIdToInt(recipients);
const socialLinks = [
  {
    href: "https://www.instagram.com/",
    src: "instagram",
    alt: "instagram",
  },
  {
    href: "https://www.facebook.com/",
    src: "facebook",
    alt: "facebook",
  },
  {
    href: "https://twitter.com/",
    src: "twitter",
    alt: "twitter",
  },
];
// Write the updated recipients data back to the JSON file
fs.writeFile(
  "socialLinks.json",
  JSON.stringify(socialLinks, null, 2),
  (err) => {
    if (err) {
      console.error("Error writing recipients.json:", err);
      return;
    }
  }
);
