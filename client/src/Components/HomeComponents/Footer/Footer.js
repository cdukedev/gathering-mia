import "./Footer.scss";
import facebook from "../../../assets/icons/facebook.svg";
import instagram from "../../../assets/icons/instagram.svg";
import twitter from "../../../assets/icons/twitter.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div id="contact" className="contact">
        <h2 className="contact__content contact__content-1 contact__title">
          Get in Touch
        </h2>
        <div className="contact__content contact__content-2 contact__social-links">
          <a className="contact__social-link" href="https://www.instagram.com/">
            <img
              className="contact__social-link-image"
              src={instagram}
              alt="instagram"
            />
          </a>
          <a className="contact__social-link" href="https://www.facebook.com/">
            <img
              className="contact__social-link--height"
              src={facebook}
              alt="facebook"
            />
          </a>
          <a className="contact__social-link" href="https://twitter.com/">
            <img
              className="contact__social-link-image"
              src={twitter}
              alt="twitter"
            />
          </a>
        </div>
        <div className="contact__content contact__content-4">
          <div className="contact__content-items">
            <span className="contact__content-item contact__content-item--bold">
              Feeding South Florida
            </span>
            <br />
            <span className="contact__content-item">
              Serving South Florida communities and families
            </span>
          </div>
          <div className="contact__content-items">
            <span className="contact__content-item">
              Palm Beach, Broward County, and Miami
            </span>
            <span className="contact__content-item">Florida, USA</span>
          </div>
          <div className="contact__content-items">
            <span className="contact__content-item">
              <a
                className="contact__content-item--link"
                href="mailto:info@thebeesknees.com"
              >
                info@feedingsouthflorida.com
              </a>
            </span>
          </div>
        </div>
        <hr className="contact__hr" />
        <div className="contact__content contact__content-5">
          <div className="contact__content-items">
            <span className="contact__content-item contact__content-item--bold">
              FoodShare
            </span>
            <br />
            <span className="contact__content-item">
              Food and Grace Foundation
            </span>
          </div>
          <div className="contact__content-items">
            <span className="contact__content-item">Fort Lauderdale</span>
            <span className="contact__content-item">Florida, USA</span>
          </div>
          <div className="contact__content-items">
            <span className="contact__content-item">
              <a
                className="contact__content-item--link"
                href="mailto:pearl.gregg@limitlessag.com"
              >
                info@foodshare.org
              </a>
            </span>
          </div>
        </div>
        <hr className="contact__hr" />
        <div className="contact__content contact__content-6">
          <div className="contact__content-items">
            <span className="contact__content-item contact__content-item--bold">
              GatheringMIA
            </span>
            <br />
            <span className="contact__content-item">
              South Florida Regenerative and High Nutrient Dense food sources.
            </span>
          </div>
          <div className="contact__content-items">
            <span className="contact__content-item">Miami</span>
            <span className="contact__content-item">Florida, USA</span>
          </div>
          <div className="contact__content-items">
            <span className="contact__content-item">
              <a
                className="contact__content-item--link"
                href="mailto:gatheringmia@gmail.com"
              >
                gatheringmia@gmail.com
              </a>
            </span>
          </div>
        </div>
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
