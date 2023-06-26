import React, { FC } from "react";
import { Link } from "react-router-dom";
import backButton from "../../assets/icons/map-back-button.svg";
import "./BackButton.scss";

const BackButton: FC = () => {
  return (
    <div className="back-button" data-testid="back-button">
      <Link to="/">
        <img src={backButton} alt="back button" title='Go back' />
      </Link>
    </div>
  );
};

export default BackButton;