import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Container, Card, Paper } from "@material-ui/core";
import { Typography, Link } from "@mui/material/";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import HardwareIcon from "@mui/icons-material/Hardware";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";

import StarRatings from "../StarRatings.jsx";
import AppContext from "../../hooks/context.js";

const MyProfile = () => {
  const { user } = useContext(AppContext);

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

  if (!user?.contractor) {
    return (
      <div className="profileContainer">
        <Container maxWidth="xs" style={{ marginTop: "44px" }}>
          <Paper elevation={8} className="profilePage">
            <div className="profileLeft">
              <AccountCircleIcon
                style={{ fontSize: "80px", alignSelf: "center" }}
              />
              <Typography component="p" variant="caption">
                Member since: 12-2021
              </Typography>
            </div>
            <div
              className="profileRight"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "spaceAround",
                alignItems: "center",
              }}
            >
              <Link href="/update">
                <Button color="secondary">Edit Profile</Button>
              </Link>
              <h2>{user?.firstname}</h2>
              <h3>{user?.lastname}</h3>
            </div>
          </Paper>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="profileContainer">
        <Container maxWidth="xs" style={{ marginTop: "44px" }}>
          <Paper elevation={8} className="profilePage">
            <div className="profileLeft">
              <AccountCircleIcon
                style={{ fontSize: "80px", alignSelf: "center" }}
              />
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
                <Button
                  href="/update"
                  variant="contained"
                  className="profileBtn"
                >
                  Add/Remove
                </Button>
              </Card>

              <Paper className="pageReviews">
                <Typography
                  component="p"
                  variant="caption"
                  style={{ color: "#748cab" }}
                >
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
              <Button href="/update" variant="contained" className="profileBtn">
                Edit Profile
              </Button>

              <Typography component="h2" variant="h2">
                {user.company}
              </Typography>
              <Typography component="h5" variant="subhead">
                {user.firstname + " " + user.lastname}
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
                <Button
                  href="/update"
                  className="profileBtn"
                  variant="contained"
                  style={{ fontSize: "12px" }}
                >
                  Add/Remove
                </Button>
              </Card>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
};

export default MyProfile;
