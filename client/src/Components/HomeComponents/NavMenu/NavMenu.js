import "./NavMenu.scss";
import NavButton from "../../../assets/icons/nav-button.svg";
import { useHandleMenuItemClick } from "../../../hooks/useHandleMenuItemClick.js";
import NavMenuItem from "./NavMenuItem";

function NavMenu({ handleNavMenu, navMenu }) {
  const handleMenuItemClick = useHandleMenuItemClick(handleNavMenu);

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
              <NavMenuItem label="DELIVER FOOD" to="/map" />
              <NavMenuItem label="FIND RESOURCES" to="/map" />
              <NavMenuItem
                label="ABOUT US"
                to="#"
                handleClick={() => handleMenuItemClick("AboutUs")}
              />
              <NavMenuItem
                label="GET INVOLVED"
                to="#"
                handleClick={() => handleMenuItemClick("TakePart")}
              />
              <NavMenuItem
                label="NEED FOOD ASSISTANCE?"
                to="#"
                handleClick={() => handleMenuItemClick("NeedHelp")}
              />
              <NavMenuItem
                label="CONTACT US"
                to="#"
                handleClick={() => handleMenuItemClick("contact")}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NavMenu;
