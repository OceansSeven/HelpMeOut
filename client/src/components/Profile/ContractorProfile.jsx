import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";

const ContractorProfile = ({ user }) => {
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <CardHeader></CardHeader>
      <div className="profileLeft">
        <BuildIcon style={{ fontSize: "72px" }} />
        <div>{user?.rating}</div>
        <Card>
          Tools:
          {user?.tools?.map((tool) => (
            <Card key={Math.random()}>{tool}</Card>
          ))}
        </Card>
        <div>Member since 12-2021</div>
      </div>
      <div className="profileRight">
        <h2>{user?.company}</h2>
        <h4>
          {user?.firstname} {user?.lastname}
        </h4>
        <ul className="specialties">
          {user?.specialties?.map((specialty) => (
            <li key={Math.random()}>{specialty}</li>
          ))}
        </ul>
        <Button variant="outlined" style={{ marginBottom: "44px" }}>
          Message Me
        </Button>
        <Card>
          Certifications:
          {user?.certifications?.map((cert) => (
            <Card key={Math.random()}>{cert}</Card>
          ))}
        </Card>
      </div>
    </Container>
  );
};

export default ContractorProfile;
