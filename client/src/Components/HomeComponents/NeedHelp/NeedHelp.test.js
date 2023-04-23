import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NeedHelp from "./NeedHelp";

describe("NeedHelp component", () => {
  test("renders NeedHelp component correctly", () => {
    render(<NeedHelp />);

    // Check if the title is rendered
    const title = screen.getByText(/do you need food\?/i);
    expect(title).toBeInTheDocument();

    // Check if the image is rendered
    const image = screen.getByAltText("people sharing food together");
    expect(image).toBeInTheDocument();

    // Check if the text content is rendered
    const textContent = screen.getByText(
      /do you or someone you know need food\?/i
    );
    expect(textContent).toBeInTheDocument();

    // Check if the list header is rendered
    const listHeader = screen.getByText(/easy steps to get help./i);
    expect(listHeader).toBeInTheDocument();

    // Check if the list items are rendered
    const listItem1 = screen.getByText(
      /choose find resources in the app menu./i
    );
    const listItem2 = screen.getByText(
      /Here you can filter the list of food banks and community gardens to just see food banks./i
    );
    const listItem3 = screen.getByText(
      /You may call the locations closest to you to sign up to sign-up to recieve deliveries./i
    );
    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();

    // Check if the Good News paragraph is rendered
    const goodNewsParagraph = screen.getByText(
      /Good News! We are working with the many organizations in South Florida to create an easier sign-up process. This will help us to achieve a community where no one needs to go hungry./i
    );
    expect(goodNewsParagraph).toBeInTheDocument();
  });
});
