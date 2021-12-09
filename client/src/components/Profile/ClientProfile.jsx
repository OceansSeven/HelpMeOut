import React, { useState, useEffect, useRef } from "react";
import { Container, Card, CardHeader, Paper } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";

const ClientProfile = () => {
  return (
    <Paper>
      <CardHeader></CardHeader>
      <div className="profileLeft">
        <PersonIcon />
        <div>Member since 12-2021</div>
      </div>
      <div className="profileRight"></div>
    </Paper>
  );
};

export default ClientProfile;
