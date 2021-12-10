import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
// * * * * in line styling just so i dont throw up while working on functionality... * * * *
const ClientProfile = ({ user }) => {
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
        <h2>{user?.firstName}</h2>
        <h3>{user?.lastName}</h3>
        <Button variant="outlined">Message Me</Button>
      </div>
    </Paper>
  );
};

export default ClientProfile;
