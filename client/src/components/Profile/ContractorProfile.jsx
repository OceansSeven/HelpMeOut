import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import StarRatings from "../StarRatings.jsx";
import Link from "@mui/material/Link";
import AppContext from "../../hooks/context.js";

const ContractorProfile = ({ user }) => {
  const currentUser = useContext(AppContext);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {}, [user]);
  return (
    <div className="clientProfile">
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={8} className="profilePage">
          <div className="profileLeft">
            <BuildIcon style={{ fontSize: "72px" }} />
            <StarRatings rating={Number(user?.rating)} />
            <Card>
              Tools:
              {user?.tools?.map((tool) => (
                <Card key={Math.random()}>{tool}</Card>
              ))}
            </Card>
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
            <Link href={`/messages/${user.user_id}`}>
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
