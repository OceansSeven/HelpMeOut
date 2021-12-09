import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Card, CardHeader, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";

const ContractorProfile = () => {
  return (
    <Paper>
      <CardHeader></CardHeader>
      <div className="profileLeft">
        <BuildIcon />
        <div>*****</div>
        <Card>Map tools here</Card>
        <div>Member since 12-2021</div>
      </div>
      <div className="profileRight">
        <p>Edit profile</p>
        <h2>Username/Company Name</h2>
        <h4>Company contact email</h4>
        <ul className="specialties">
          <li>SPECIALTY</li>
          <li>SPECIALTY</li>
        </ul>
        <Button variant="outlined">Message Me</Button>
        <Card>Map certifications here</Card>
      </div>
    </Paper>
  );
};

export default ContractorProfile;
