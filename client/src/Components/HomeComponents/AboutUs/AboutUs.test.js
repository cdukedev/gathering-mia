// // Import required libraries
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import AboutUs from "./AboutUs";
// import React from "react";
// describe("AboutUs component", () => {
//   test("renders AboutUs component correctly", () => {
//     render(<AboutUs />);

//     // Check if the title is rendered
//     const title = screen.getByText(/who we are/i);
//     expect(title).toBeInTheDocument();

//     // Check if the image is rendered
//     const image = screen.getByAltText("people sharing food together");
//     expect(image).toBeInTheDocument();

//     // Check if the text is rendered
//     const text = screen.getByText(
//       /we are an organization that prioritizes the needs of the community/i
//     );
//     expect(text).toBeInTheDocument();

//     // Check if the div with the "about-us" class is rendered
//     const aboutUsDiv = screen.getByTestId("about-us");
//     expect(aboutUsDiv).toBeInTheDocument();
//   });
// });
