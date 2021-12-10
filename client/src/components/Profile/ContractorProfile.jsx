import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";

const ContractorProfile = ({ user }) => {
  return (
    <Paper>
      <CardHeader></CardHeader>
      <div className="profileLeft">
        <BuildIcon />
        <div>{user.rating}</div>
        <Card>
          Tools:
          {user?.tools.map((tool) => (
            <Card>{tool}</Card>
          ))}
        </Card>
        <div>Member since 12-2021</div>
      </div>
      <div className="profileRight">
        <h2>{user?.company}</h2>
        <ul className="specialties">
          {user.specialties?.map((specialty) => (
            <li>{specialty}</li>
          ))}
        </ul>
        <Button variant="outlined">Message Me</Button>
        <Card>
          Certifications:
          {user.certifications?.map((cert) => (
            <Card>{cert}</Card>
          ))}
        </Card>
      </div>
    </Paper>
  );
};

export default ContractorProfile;
