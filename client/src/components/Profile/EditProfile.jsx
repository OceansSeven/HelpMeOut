import * as React from "react";
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

export default function EditProfile({ user }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <h2 style={{ textAlign: "center" }}>
            {user.firstName} {user.lastName}
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
            control={<Checkbox value="updateContractor" color="primary" />}
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
}
