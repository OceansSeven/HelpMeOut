import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
// * * * * in line styling just so i dont throw up while working on functionality... * * * *
const ClientProfile = () => {
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
        <Button color="secondary" style={{ alignSelf: "flex-end" }}>
          Edit Profile
        </Button>
        <h2>First Name Last Name</h2>
        <h3>Username</h3>
        <Button variant="outlined">Message Me</Button>
      </div>
    </Paper>
  );
};

export default ClientProfile;
