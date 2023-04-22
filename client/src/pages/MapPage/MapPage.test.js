import React from "react";
import { render, screen, getByTestId } from "@testing-library/react";
import { MapPageContext } from "../../context/MapPageContext";
import MapPage from "./MapPage";



test("renders the MapPage component correctly", () => {
  render(<MapPage />);
  const mapPage = screen.getByTestId("map-page");
  expect(mapPage).toBeInTheDocument();
});
