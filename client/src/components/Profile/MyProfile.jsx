import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import BuildIcon from "@material-ui/icons/Build";
import Link from "@mui/material/Link";

const MyProfile = ({ user }) => {
  if (!user?.contractor) {
    return (
      <Paper style={{ display: "flex", justifyContent: "center" }}>
        <CardHeader></CardHeader>
        <div
          className="profileLeft"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
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
    );
  } else {
    return (
      <Paper>
        <CardHeader></CardHeader>
        <div className="profileLeft">
          <BuildIcon />
          <div>{user.rating}</div>
          <Card>
            Tools:
            <Button color="secondary">Add</Button>
            {user.tools.map((tool) => (
              <Card>{tool}</Card>
            ))}
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
            {user.specialties?.map((specialty) => (
              <li>{specialty}</li>
            ))}
          </ul>
          <Card>
            Certifications:
            <Button color="secondary">Add</Button>
            {user.certifications?.map((cert) => (
              <Card>{cert}</Card>
            ))}
          </Card>
        </div>
      </Paper>
    );
  }
};

export default MyProfile;
