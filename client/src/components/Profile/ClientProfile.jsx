import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
const ClientProfile = ({ user }) => {
  return (
    <Paper className="profilePage">
      <CardHeader></CardHeader>
      <div className="profileLeft">
        <PersonIcon style={{ fontSize: "72px" }} />
        <div>Member since 12-2021</div>
      </div>
      <div className="profileRight">
        <h2>{user?.firstName}</h2>
        <h3>{user?.lastName}</h3>
        <Button variant="outlined" style={{ marginBottom: "44px" }}>
          Message Me
        </Button>
      </div>
    </Paper>
  );
};

export default ClientProfile;
