import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";

import PersonIcon from "@material-ui/icons/Person";
const ClientProfile = ({ user }) => {
  return (
    <div className="clientProfile">
      <Container maxWidth="xs" style={{ marginTop: "44px" }}>
        <Paper elevation={8} className="profilePage">
          <div className="profileLeft">
            <PersonIcon style={{ fontSize: "80px", alignSelf: "center" }} />
            <Typography component="p" variant="caption">
              Member since: 12-2021
            </Typography>
          </div>
          <div className="profileRight">
            <Typography component="h5" variant="subhead">
              {user?.firstname}
            </Typography>
            <Typography component="h5" variant="subhead">
              {user?.lastname}
            </Typography>
            <br />
            <Button
              variant="outlined"
              href={`/messages/${user.id}`}
              style={{ marginBottom: "44px" }}
            >
              Message Me
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ClientProfile;
