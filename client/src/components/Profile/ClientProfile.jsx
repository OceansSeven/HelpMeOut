import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";

const ClientProfile = () => {
  return (
    <Paper>
      <CardHeader></CardHeader>
      <div className="profileLeft">
        <PersonIcon />
        <div>Member since 12-2021</div>
      </div>
      <div className="profileRight">
        <p>Edit profile</p>
        <h2>First Name Last Name</h2>
        <h3>Username</h3>
        <Button variant="outlined">Message Me</Button>
      </div>
    </Paper>
  );
};

export default ClientProfile;
