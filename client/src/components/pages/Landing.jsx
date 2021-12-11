import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AppContext from "../../hooks/context";

const Landing = function Landing() {
  return (
    <div className="landing-page">
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
            <button className="btn btn-primary btn-xl">Log In</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary btn-xl">Register</button>
          </Link>
          </span>
      </div>
  );
};

export default Landing;
