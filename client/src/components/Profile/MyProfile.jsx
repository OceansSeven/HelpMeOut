import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "@mui/material/Link";

import AppContext from "../../hooks/context.js";

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (!currentUser?.contractor) {
    return (
      <div className="profileContainer">
        <Container maxWidth="xs" style={{ marginTop: "44px" }}>
          <CardHeader style={{ background: "#3d3d3d" }}></CardHeader>
          <Paper elevation={8} className="profilePage">
            <div className="profileLeft">
              <AccountCircleIcon style={{ fontSize: "72px" }} />
              <div>Member since 12-2021</div>
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
              <h2>{currentUser?.firstname}</h2>
              <h3>{currentUser?.lastname}</h3>
            </div>
          </Paper>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="profileContainer">
        <Container maxWidth="xs" style={{ marginTop: "44px" }}>
          <CardHeader style={{ background: "#1d2d44" }}></CardHeader>
          <Paper elevation={8} className="profilePage">
            <div className="profileLeft">
              <AccountCircleIcon style={{ fontSize: "72px" }} />
              <div>{currentUser?.rating}</div>
              <Card className="itemCard">
                <div>
                  <p>Tools:</p>
                  <Link href="/update">
                    <Button color="secondary">Add/Remove</Button>
                  </Link>{" "}
                </div>
                <ul>
                  {currentUser?.tools?.map((tool) => (
                    <li key={Math.random()}>{tool}</li>
                  ))}
                </ul>
              </Card>
              <div>Member since 12-2021</div>
            </div>
            <div className="profileRight">
              <Link href="/update">
                <Button color="secondary">Edit Profile</Button>
              </Link>{" "}
              <h2>{currentUser.company}</h2>
              <h5>{currentUser.firstname + " " + currentUser.lastname}</h5>
              <ul className="specialties">
                {currentUser?.specialties?.map((specialty) => (
                  <li key={Math.random()}>{specialty}</li>
                ))}
              </ul>
              <Card className="itemCard">
                <div>
                  Certifications:
                  <Link href="/update">
                    <Button color="secondary" style={{ fontSize: "12px" }}>
                      Add/Remove
                    </Button>
                  </Link>{" "}
                </div>
                <ul>
                  {currentUser?.certifications?.map((cert) => (
                    <li key={Math.random()}>{cert}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
};

export default MyProfile;
