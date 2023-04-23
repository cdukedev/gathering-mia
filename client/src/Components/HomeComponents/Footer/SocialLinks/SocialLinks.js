import React from "react";
import facebook from "../../../../assets/icons/facebook.svg";
import instagram from "../../../../assets/icons/instagram.svg";
import twitter from "../../../../assets/icons/twitter.svg";
import "./SocialLinks.scss";

const getImageSource = (src) => {
  switch (src) {
    case "facebook":
      return facebook;
    case "instagram":
      return instagram;
    case "twitter":
      return twitter;
    default:
      return "";
  }
};

const SocialLinks = ({ links }) => {
  return (
    <div className="contact__social-links">
      {links.map(({ href, src, alt }) => {
        const imageSource = getImageSource(src);

        return (
          <a key={alt} className="contact__social-link" href={href}>
            <img
              className="contact__social-link-image"
              src={imageSource}
              alt={alt}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
