import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Desktop from "./Desktop";

describe("Desktop component", () => {
  test("renders Desktop component correctly", () => {
    render(<Desktop />);

    // Check if the logo is rendered
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();

    // Check if the content text is rendered
    const contentText = screen.getByText(
      /this site is intended for mobile use/i
    );
    expect(contentText).toBeInTheDocument();

    // Check if the QR code is rendered
    const qrCode = screen.getByAltText("gathering website QR Code");
    expect(qrCode).toBeInTheDocument();

    // Check if the additional instruction text is rendered
    const additionalInstructions = screen.getByText(
      /you may also type gathering-mia\.live/i
    );
    expect(additionalInstructions).toBeInTheDocument();
  });
});
