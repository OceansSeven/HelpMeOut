import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";

import BuildIcon from "@material-ui/icons/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import HardwareIcon from "@mui/icons-material/Hardware";
import HandymanIcon from "@mui/icons-material/Handyman";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import StarRatings from "../StarRatings.jsx";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AppContext from "../../hooks/context.js";
import axios from "axios";

const ContractorProfile = ({ user }) => {
  const currentUser = useContext(AppContext);

  const [userReviews, setUserReviews] = useState();
  const [showReviews, setShowReviews] = useState("Reviews from others:");

  useEffect(() => {
    axios.get(`/api/reviews/${user.id}`).then(({ data }) => {
      setUserReviews(data[0]);
    });
  }, [user]);

  useEffect(() => {
    if (userReviews?.length === 0) {
      setShowReviews("");
    }
  }, [userReviews]);
  return (
    <div className="clientProfile">
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={8} className="profilePage">
          <div className="profileLeft">
            <HandymanIcon style={{ fontSize: "80px", alignSelf: "center" }} />
            <Card className="itemCard">
              <div className="pListHead">
                <Typography component="p" variant="caption">
                  <HardwareIcon /> My Tools:
                </Typography>
              </div>
              <ul className="pAttributes">
                {user?.tools?.map((tool) => (
                  <li key={Math.random()} style={{ alignSelf: "baseline" }}>
                    <Typography component="p" variant="button">
                      {tool}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>
            <p>{showReviews}</p>
            <Paper className="pageReviews">
              {userReviews?.map((review) => (
                <Card key={Number(user.id)}>
                  <StarRatings rating={Number(review.rating)} />
                  <Typography component="h4" variant="body2">
                    {'"' + review.body + '"'}
                  </Typography>
                  <Typography component="p" variant="caption">
                    {review.date.split("T")[0]}
                  </Typography>
                </Card>
              ))}
            </Paper>
            <Typography component="p" variant="caption">
              Member since: 12-2021
            </Typography>
          </div>
          <div className="profileRight">
            <Typography component="h2" variant="display1">
              {user?.company}
            </Typography>
            <br />
            <Typography component="h5" variant="subhead">
              {user?.firstname + " " + user?.lastname}
            </Typography>
            <ul className="specialties">
              {user?.specialties?.map((specialty) => (
                <li
                  key={Math.random()}
                  style={{
                    color: "#748cab",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <VerifiedIcon size="sm" />
                  {specialty}
                </li>
              ))}
            </ul>
            <Button
              variant="outlined"
              href={`/messages/${user.id}`}
              style={{ marginBottom: "44px" }}
            >
              Message Me
            </Button>
            <Card className="itemCard">
              <div className="pListHead">
                <Typography component="p" variant="caption">
                  <FilterFramesIcon style={{ marginRight: "4px" }} />
                  My Certifications:
                </Typography>
              </div>
              <ul className="pAttributes">
                {user?.certifications?.map((cert) => (
                  <li key={Math.random()} style={{ color: "#37474f" }}>
                    <Typography component="p" variant="button">
                      {cert}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ContractorProfile;
