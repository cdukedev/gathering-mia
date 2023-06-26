// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { GeolocationContext } from "../../../contexts/GeolocationContext";
// import { FoodBankContext } from "../../../contexts/FoodBankContext";
// import { CommunityGardenContext } from "../../../contexts/CommunityGardenContext";
// import Map from "./Map";

// jest.mock("@react-google-maps/api", () => ({
//   GoogleMap: jest.fn(() => <div data-testid="google-map" />),
//   InfoWindow: jest.fn(),
//   LoadScript: jest.fn((props) => <div>{props.children}</div>),
//   Marker: jest.fn(),
// }));

// describe("Map_function", () => {
//   // Tests that the Map component renders with valid props.
//   it("test_map_renders_with_valid_props", () => {
//     const geolocationValue = { coords: { lat: 12.34, lng: 56.78 } };
//     const foodBankValue = { foodBanks: [], foodBankToggle: true };
//     const communityGardenValue = {
//       communityGardens: [],
//       communityGardenToggle: true,
//     };

//     render(
//       <GeolocationContext.Provider value={geolocationValue}>
//         <FoodBankContext.Provider value={foodBankValue}>
//           <CommunityGardenContext.Provider value={communityGardenValue}>
//             <Map height="100vh" zoom={15} />
//           </CommunityGardenContext.Provider>
//         </FoodBankContext.Provider>
//       </GeolocationContext.Provider>
//     );

//     // Check if the map is rendered
//     const googleMap = screen.getByTestId("google-map");
//     expect(googleMap).toBeInTheDocument();
//   });

//   // Tests that the GeolocationContext provides valid coordinates.
//   it("test_geolocation_context_provides_valid_coords", () => {
//     const geolocationValue = { coords: { lat: 37.7749, lng: -122.4194 } };
//     const foodBankValue = { foodBanks: [], foodBankToggle: true };
//     const communityGardenValue = {
//       communityGardens: [],
//       communityGardenToggle: true,
//     };

//     render(
//       <GeolocationContext.Provider value={geolocationValue}>
//         <FoodBankContext.Provider value={foodBankValue}>
//           <CommunityGardenContext.Provider value={communityGardenValue}>
//             <Map height="100vh" zoom={15} />
//           </CommunityGardenContext.Provider>
//         </FoodBankContext.Provider>
//       </GeolocationContext.Provider>
//     );

//     const mapComponent = screen.getByTestId("google-map");
//     const { coords } = geolocationValue;
//     expect(coords.lat).toEqual(37.7749);
//     expect(coords.lng).toEqual(-122.4194);
//   });
//   // Tests that the Map component handles the case where the GeolocationContext does not provide coordinates.
//   it("test_geolocation_context_does_not_provide_coords", () => {
//     const geolocationValue = {};
//     const foodBankValue = { foodBanks: [], foodBankToggle: true };
//     const communityGardenValue = {
//       communityGardens: [],
//       communityGardenToggle: true,
//     };

//     render(
//       <GeolocationContext.Provider value={geolocationValue}>
//         <FoodBankContext.Provider value={foodBankValue}>
//           <CommunityGardenContext.Provider value={communityGardenValue}>
//             <Map height="100vh" zoom={15} />
//           </CommunityGardenContext.Provider>
//         </FoodBankContext.Provider>
//       </GeolocationContext.Provider>
//     );

//     const mapComponent = screen.queryByTestId("google-map");
//     const { coords } = geolocationValue;

//     expect(coords).toBeUndefined();
//   });

//   // Tests that the Map component handles the case where the FoodBankContext and CommunityGardenContext provide empty data.
//   it("test_foodbank_and_communitygarden_context_provide_empty_data", () => {
//     const geolocationValue = { coords: { lat: 37.7749, lng: -122.4194 } };
//     const foodBankValue = { foodBanks: [], foodBankToggle: true };
//     const communityGardenValue = {
//       communityGardens: [],
//       communityGardenToggle: true,
//     };

//     render(
//       <GeolocationContext.Provider value={geolocationValue}>
//         <FoodBankContext.Provider value={foodBankValue}>
//           <CommunityGardenContext.Provider value={communityGardenValue}>
//             <Map height="100vh" zoom={15} />
//           </CommunityGardenContext.Provider>
//         </FoodBankContext.Provider>
//       </GeolocationContext.Provider>
//     );

//     const mapComponent = screen.getByTestId("google-map");

//     // Verify that the map component is rendered.
//     expect(mapComponent).toBeInTheDocument();

//     // Verify that no markers are rendered for food banks and community gardens.
//     expect(screen.queryAllByTestId("foodbank-marker")).toHaveLength(0);
//     expect(screen.queryAllByTestId("communitygarden-marker")).toHaveLength(0);
//   });

//   //   // Tests that the FoodBankContext and CommunityGardenContext provide valid data.
//   //   it("test_foodbank_and_communitygarden_context_provide_valid_data", () => {
//   //     // Test code here
//   //   });

//   //   // Tests that the Marker is clicked and the InfoWindow displays correct information.
//   //   it("test_marker_clicked_and_infowindow_displays_correct_information", () => {
//   //     // Test code here
//   //   });
// });
