import React from "react";
import { Link } from "react-router-dom";

const NavMenuItem = ({ label, to, handleClick }) => {
  return (
    <Link className="nav-menu__item" to={to} onClick={handleClick}>
      {label}
    </Link>
  );
};

export default NavMenuItem;
