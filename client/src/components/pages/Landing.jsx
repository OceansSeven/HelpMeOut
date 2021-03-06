import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Landing = function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <div className="logo-landing-contain">
          <img className="landing-logo" src={"../assets/helpmeout_logo.webp"} alt="logo" />
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
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button size="large">Log In</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button size="large">Register</Button>
            </Link>
            </span>
        </div>
      </div>
  );
};

export default Landing;
