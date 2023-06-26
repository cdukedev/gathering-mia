import backButton from "../../assets/icons/map-back-button.svg";
import React from "react";
import "./BackButton.scss";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <div className="back-button" data-testid="back-button">
      <Link to="/">
        <img src={backButton} alt="back button" title='Go back' />
      </Link>
    </div>
  );
};

export default BackButton;

