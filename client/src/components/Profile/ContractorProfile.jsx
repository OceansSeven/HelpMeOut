import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
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
            <BuildIcon style={{ fontSize: "72px" }} />
            <StarRatings rating={Number(user?.rating)} />
            <Card style={{ marginBottom: "32px" }}>
              Tools:
              {user?.tools?.map((tool) => (
                <Card key={Math.random()}>{tool}</Card>
              ))}
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
            <div>Member since 12-2021</div>
          </div>
          <div className="profileRight">
            <h2>{user?.company}</h2>
            <h4>
              {user?.firstname} {user?.lastname}
            </h4>
            <ul className="specialties">
              {user?.specialties?.map((specialty) => (
                <li key={Math.random()}>{specialty}</li>
              ))}
            </ul>
            <Link href={`/messages/${user.id}`}>
              <Button variant="outlined" style={{ marginBottom: "44px" }}>
                Message Me
              </Button>
            </Link>
            <Card>
              Certifications:
              {user?.certifications?.map((cert) => (
                <Card key={Math.random()}>{cert}</Card>
              ))}
            </Card>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ContractorProfile;
