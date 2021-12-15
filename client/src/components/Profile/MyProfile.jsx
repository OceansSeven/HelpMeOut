import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import HardwareIcon from "@mui/icons-material/Hardware";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import Link from "@mui/material/Link";

import AppContext from "../../hooks/context.js";

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
                  {user?.tools?.map((tool) => (
                    <li key={Math.random()} style={{ alignSelf: "baseline" }}>
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
              <Typography component="p" variant="caption">
                Member since: 12-2021
              </Typography>
            </div>
            <div className="profileRight">
              <Button href="/update" variant="contained" className="profileBtn">
                Edit Profile
              </Button>

              <Typography component="h2" variant="display1">
                {user.company}
              </Typography>
              <br />
              <Typography component="h5" variant="subhead">
                {user.firstname + " " + user.lastname}
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
