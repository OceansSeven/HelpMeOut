import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import AppContext from "../../hooks/context";

const Landing = function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <div className="logo-landing-contain">
          <img className="landing-logo" src={"../assets/helpmeout_logo.png"} />
        </div>
        <br/>
          <div className="about-text">
            <h3>
              <em>
                A Platform Connecting the Community to Top-Rated Local Contractors
              </em>
            </h3>
            </div>
            <span className="landing-buttons">
            <Link to="/login">
              <Button size="large">Log In</Button>
            </Link>
            <Link to="/register">
              <Button size="large">Register</Button>
            </Link>
            </span>
        </div>
      </div>
  );
};

export default Landing;
