import backButton from "../../assets/icons/map-back-button.svg";
import React from "react";
import "./BackButton.scss";
import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <div className="back-button">
      <Link to="/">
        <img src={backButton} alt="back button" />
      </Link>
    </div>
  );
}
