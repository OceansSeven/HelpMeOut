import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Card, Paper } from "@material-ui/core";
import axios from "axios";
import BuildIcon from "@material-ui/icons/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import HardwareIcon from "@mui/icons-material/Hardware";
import HandymanIcon from "@mui/icons-material/Handyman";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import { Typography, Link } from "@mui/material/";
import StarRatings from "../StarRatings.jsx";

const ContractorProfile = ({ user }) => {
  const [userReviews, setUserReviews] = useState();
  const [showReviews, setShowReviews] = useState("Reviews from others:");

  useEffect(() => {
    axios.get(`/api/reviews/${user.id}`).then(({ data }) => {
      setUserReviews(data[0]);
    });
  }, [user]);

  useEffect(() => {
    if (userReviews?.length === 0) {
      setShowReviews(null);
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
                {user?.tools?.map((tool, i) => (
                  <li key={i} style={{ alignSelf: "baseline" }}>
                    <Typography component="p" variant="button">
                      {tool}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>

            <Paper className="pageReviews">
              <Typography component="h4" variant="caption">
                {showReviews}
              </Typography>
              {userReviews?.map((review, i) => (
                <Card key={i} className="contractorReviewCard">
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
              {user?.specialties?.map((specialty, i) => (
                <li
                  key={i}
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
                {user?.certifications?.map((cert, i) => (
                  <li key={i} style={{ color: "#37474f" }}>
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
