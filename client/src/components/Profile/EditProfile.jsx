import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const EditProfile = (user) => {
  //const {user} = useContext()   <---- current user from app context
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(event.target);
    console.log({
      first: data.get("firstName"),
      last: data.get("lastName"),
      setContractor: data.get("setContractor"),
      company: data.get("companyName"),
      tool: data.get("addTool"),
      cert: data.get("addCert"),
    });
  };

  if (!user?.isContractor) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <h2 style={{ textAlign: "center" }}>
              {user?.firstName} {user?.lastName}
            </h2>
            <TextField
              margin="normal"
              fullWidth
              id="updateFirstName"
              label="Edit First Name"
              name="firstName"
            />
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label="Edit Last Name"
              id="updateLastName"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="checked"
                  name="setContractor"
                  color="primary"
                />
              }
              label="I would like to start helping out others!"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <h2 style={{ textAlign: "center" }}>
              {user?.firstName} {user?.lastName}
            </h2>
            <TextField
              margin="normal"
              fullWidth
              id="updateFirstName"
              label="Edit First Name"
              name="firstName"
            />
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label="Edit Last Name"
              id="updateLastName"
            />
            <TextField
              margin="normal"
              fullWidth
              name="companyName"
              label="Edit Company Name"
              id="updateCompanyName"
            />
            <TextField
              fullWidth
              id="addTool"
              name="addTool"
              label="Add a tool"
              variant="filled"
            />
            <TextField
              fullWidth
              id="addCert"
              name="addCert"
              label="Add a certification"
              variant="filled"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }
};

export default EditProfile;
