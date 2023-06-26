import React from "react";
import { render, screen } from "@testing-library/react";
import SocialLinks from "../path-to-your-component/SocialLinks";

describe("SocialLinks Component", () => {
  const links = [
    {
      href: "https://www.facebook.com/profile",
      src: "facebook",
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/profile",
      src: "instagram",
      alt: "Instagram",
    },
    {
      href: "https://www.twitter.com/profile",
      src: "twitter",
      alt: "Twitter",
    },
  ];

  it("should render links correctly", () => {
    render(<SocialLinks links={links} />);

    links.forEach((link) => {
      const anchorElement = screen.getByTestId(`social-link-${link.src}`);
      expect(anchorElement).toBeInTheDocument();
      expect(anchorElement).toHaveAttribute("href", link.href);

      const imgElement = screen.getByAltText(link.alt);
      expect(imgElement).toBeInTheDocument();
    });
  });
});
