import "./NavMenu.scss";
import NavButton from "../../../../assets/icons/nav-button.svg";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

function NavMenu({ handleNavMenu, navMenu }) {
  const scrollToElement = (hash) => {
    scroll.scrollTo(document.getElementById(hash).offsetTop);
    handleNavMenu();
  };

  if (!navMenu) {
    return (
      <div className="nav-menu nav-menu-off">
        <div className="nav-menu__button-container">
          <img
            onClick={handleNavMenu}
            className="nav-menu__button"
            src={NavButton}
            alt="nav-button"
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="nav">
          <div className="nav-menu">
            <div className="nav-menu__button-container" onClick={handleNavMenu}>
              <img
                className="nav-menu__button"
                src={NavButton}
                alt="nav-button"
              />
            </div>
            <div className="nav-menu__items">
              <Link className="nav-menu__item" to="/map">
                DELIVER FOOD
              </Link>
              <Link className="nav-menu__item" to="/map">
                FIND RESOURCES
              </Link>
              <Link
                className="nav-menu__item"
                onClick={() => scrollToElement("AboutUs")}
              >
                ABOUT US
              </Link>
              <Link
                className="nav-menu__item"
                onClick={() => scrollToElement("TakePart")}
              >
                GET INVOLVED
              </Link>
              <Link
                className="nav-menu__item"
                onClick={() => scrollToElement("NeedHelp")}
              >
                NEED FOOD ASSISTANCE?
              </Link>
              <Link
                className="nav-menu__item"
                onClick={() => scrollToElement("contact")}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NavMenu;
