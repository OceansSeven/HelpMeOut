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

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import AppContext from "../../hooks/context.js";

const EditProfile = () => {
  const user = useContext(AppContext);

  const [myTools, setMyTools] = useState();
  const [newTool, setNewTool] = useState("");
  const [myCerts, setMyCerts] = useState();
  const [newCert, setNewCert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(event.target);
    console.log({
      first: data.get("firstName"),
      last: data.get("lastName"),
      setContractor: data.get("setContractor"),
      company: data.get("companyName"),
      tools: myTools,
      certs: myCerts,
    });
  };

  useEffect(() => {
    setMyTools(user.tools);
    setMyCerts(user.certifications);
  }, []);

  if (!user?.contractor) {
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
            <h2 style={{ textAlign: "center" }}></h2>
            Edit First Name:
            <TextField
              margin="normal"
              fullWidth
              id="updateFirstName"
              label={user?.lastname}
              name="firstName"
            />
            Edit Last Name:
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label={user?.lastname}
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
            <h2 style={{ textAlign: "center" }}>{user?.company}</h2>
            Edit First Name:
            <TextField
              margin="normal"
              fullWidth
              id="updateFirstName"
              label={user?.firstname}
              name="firstName"
            />
            Edit Last Name:
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label={user?.lastname}
              id="updateLastName"
            />
            Edit Company Name:
            <TextField
              margin="normal"
              fullWidth
              name="companyName"
              label={user?.company}
              id="updateCompanyName"
            />
            Add a tool:
            <div>
              <TextField
                id="addTool"
                name="addTool"
                label="Name of tool"
                value={newTool}
                variant="filled"
                onChange={(e) => {
                  setNewTool(e.target.value);
                }}
              />
              <IconButton
                aria-label="add"
                onClick={(e) => {
                  e.preventDefault();
                  const currentTools = myTools;
                  setMyTools(currentTools.concat(newTool));
                  setNewTool("");
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography component="h3" variant="caption">
              My Tools
            </Typography>
            <ul
              id="toolList"
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {myTools?.map((tool) => (
                <h4>{tool}</h4>
              ))}
            </ul>
            Add a certification:
            <div>
              <TextField
                id="addCert"
                name="addCert"
                label="Certification title"
                value={newCert}
                variant="filled"
                onChange={(e) => {
                  setNewCert(e.target.value);
                }}
              />
              <IconButton
                aria-label="add"
                onClick={(e) => {
                  e.preventDefault();
                  const currentCerts = myCerts;
                  setMyCerts(currentCerts.concat(newCert));
                  setNewCert("");
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography component="h3" variant="caption">
              My Certifications
            </Typography>
            <ul
              id="certList"
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {myCerts?.map((cert) => (
                <h4>{cert}</h4>
              ))}
            </ul>
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
