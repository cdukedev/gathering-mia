import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks/SocialLinks";
import ContactSection from "./ContactSection/ContactSection";
import "./Footer.scss";
import socialLinksData from "../../../data/socialLinks.json";
import contactSectionsData from "../../../data/contactSection.json";

function Footer() {
  return (
    <>
      <div id="contact" className="contact">
        <h2 className="contact__content contact__content-1 contact__title">
          Get in Touch
        </h2>
        <SocialLinks links={socialLinksData} />
        {contactSectionsData.map(({ title, content, email }, index) => (
          <ContactSection
            key={index}
            title={title}
            content={content}
            email={email}
          />
        ))}
        <Link
          to="/"
          className="contact__content-3 contact__content-bottom contact__content-bottom--link"
        >
          GatheringMIA
        </Link>
        <p className="contact__content-7 contact__content-item--copyright">
          Copyright Gathering © 2023 All Rights Reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
