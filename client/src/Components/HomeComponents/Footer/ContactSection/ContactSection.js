// ContactSection.js
import React from "react";
import "./ContactSection.scss"

const ContactSection = ({ title, content, email }) => {
  return (
    <>
      <section className="contact__content-items">
        <span className="contact__content-item contact__content-item--bold">
          {title}
        </span>
        <br />
        {content.map((item, index) => (
          <span key={index} className="contact__content-item">
            {item}
          </span>
        ))}
        {email && (
          <span className="contact__content-item">
            <a className="contact__content-item--link" href={`mailto:${email}`}>
              {email}
            </a>
          </span>
        )}
      </section>
      <hr className="contact__hr" />
    </>
  );
};

export default ContactSection;
