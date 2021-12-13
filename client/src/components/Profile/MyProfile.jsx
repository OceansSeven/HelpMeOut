import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import BuildIcon from "@material-ui/icons/Build";
import Link from "@mui/material/Link";

const MyProfile = ({ user }) => {
  if (!user?.contractor) {
    return (
      <Container maxWidth="xs">
        <CardHeader style={{ background: "#3d3d3d" }}></CardHeader>
        <Paper elevation="3" className="profilePage">
          <div className="profileLeft">
            <PersonIcon fontSize="large" />
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
            <h2>{user?.firstname}</h2>
            <h3>{user?.lastname}</h3>
          </div>
        </Paper>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="xs">
        <CardHeader style={{ background: "#1d2d44" }}></CardHeader>
        <Paper elevation="3" className="profilePage">
          <div className="profileLeft">
            <BuildIcon className="profileIcon" />
            <div>{user?.rating}</div>
            <Card>
              Tools:
              <Link href="/update">
                <Button color="secondary">Add</Button>
              </Link>{" "}
              <Card>
                <ul>
                  {user?.tools?.map((tool) => (
                    <li>{tool}</li>
                  ))}
                </ul>
              </Card>
            </Card>
            <div>Member since 12-2021</div>
          </div>
          <div className="profileRight">
            <Link href="/update">
              <Button color="secondary">Edit Profile</Button>
            </Link>{" "}
            <h2>{user.company}</h2>
            <h5>{user.firstname + " " + user.lastname}</h5>
            <ul className="specialties">
              {user?.specialties?.map((specialty) => (
                <li>{specialty}</li>
              ))}
            </ul>
            <Card>
              Certifications:
              <Link href="/update">
                <Button color="secondary">Add</Button>
              </Link>{" "}
              <Card>
                <ul>
                  {user?.certifications?.map((cert) => (
                    <li>{cert}</li>
                  ))}
                </ul>
              </Card>
            </Card>
          </div>
        </Paper>
      </Container>
    );
  }
};

export default MyProfile;
