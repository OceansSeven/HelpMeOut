import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputLabel, Select, MenuItem } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import BackspaceIcon from "@material-ui/icons/Backspace";
import SettingsIcon from "@material-ui/icons/Settings";

import AppContext from "../../hooks/context.js";

const EditProfile = () => {
  const { user, setUser} = useContext(AppContext);

  const [mySpecialties, setMySpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [myTools, setMyTools] = useState([]);
  const [newTool, setNewTool] = useState("");
  const [myCerts, setMyCerts] = useState([]);
  const [newCert, setNewCert] = useState("");
  const [updated, setUpdated] = useState(false);

  const handleSelectChange = (e) => {
    e.preventDefault();
    setNewSpecialty(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    axios({
      method: "PUT",
      data: {
        firstname: data.get("firstName") || user.firstname,
        lastname: data.get("lastName") || user.lastname,
        contractor: data.get("setContractor") || user.contractor,
        company: data.get("companyName") || user.company,
        specialties: mySpecialties,
        tools: myTools,
        certifications: myCerts,
        userId: Number(user.id),
      },
      withCredentials: true,
      url: "http://localhost:3000/api/user",
    })
      .then((res) => {
        // console.log(res);
        setUpdated(true);
      })
      .then(
        axios.get(`/api/user/${user.id}`).then(({ data }) => {
          if (data) {
            setUser(data);
            setMySpecialties(data.specialties || []);
            setMyTools(data.tools || []);
            setMyCerts(data.certifications || []);
          }
        })
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setMySpecialties(user.specialties || []);
    setMyTools(user.tools || []);
    setMyCerts(user.certifications || []);
  }, [user.user]);

  if (updated) {
    return <Navigate to="/profile" />;
  }
  if (!user?.contractor) {
    return (
      <Container component="main" maxWidth="xs" className="editContainer">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button href="/profile" variant="contained">
            BACK
          </Button>
          <Typography component="h1" variant="h5">
            <SettingsIcon /> Update Profile
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
            <FormControlLabel
              control={
                <Checkbox value={true} name="setContractor" color="primary" />
              }
              label="I would like to start helping out others!"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ marginBottom: "44px" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs" className="editContainer">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            href="/profile"
            variant="contained"
            fullWidth
            className="backToProfile"
          >
            BACK
          </Button>
          <Typography component="h1" variant="h5">
            <SettingsIcon /> Update Profile
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
            Add a specialty:
            <div id="addSpecialty" style={{ margin: "20px" }}>
              <FormControl fullWidth variant="standard">
                <InputLabel id="selectSpecialty">
                  Select a specialty:
                </InputLabel>
                <Select
                  labelId="selectSpecialty"
                  id="selectSpecialty"
                  value={newSpecialty}
                  label="Specialty"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={"Appliance Repair"}>
                    Appliance Repair
                  </MenuItem>
                  <MenuItem value={"Carpentry"}>Carpentry</MenuItem>
                  <MenuItem value={"Electrical"}>Electrical</MenuItem>
                  <MenuItem value={"HVAC"}>HVAC</MenuItem>
                  <MenuItem value={"Landscaping"}>Landscaping</MenuItem>
                  <MenuItem value={"Mechanic"}>Mechanic</MenuItem>
                  <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                  <MenuItem value={"Snow/Waste Removal"}>
                    Snow/Waste Removal
                  </MenuItem>
                </Select>
              </FormControl>
              <IconButton
                aria-label="add"
                onClick={(e) => {
                  e.preventDefault();
                  if (!newSpecialty) {
                    return;
                  }
                  const currentSpecialties = mySpecialties;
                  setMySpecialties(currentSpecialties.concat(newSpecialty));
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography component="p" variant="body2">
              Specialties:
            </Typography>
            <ul
              id="specialtyList"
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "space-around",
                background: "rgba(0,0,0,0.05)",
                borderRadius: "8px",
              }}
            >
              {mySpecialties?.map((specialty) => (
                <li className="listItem">
                  <Chip
                    label={specialty}
                    onDelete={(e) => {
                      e.preventDefault();
                      const results = [];
                      mySpecialties.forEach((item) => {
                        if (item !== specialty) {
                          results.push(item);
                        }
                      });
                      setMySpecialties(results);
                    }}
                  ></Chip>
                </li>
              ))}
            </ul>
            Add a tool:
            <div style={{ margin: "20px" }}>
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
                  if (!newTool) {
                    return;
                  }
                  const currentTools = myTools;
                  setMyTools([...currentTools].concat(newTool));
                  setNewTool("");
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography component="h3" variant="caption">
              My Tools:
            </Typography>
            <ul
              id="toolList"
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "space-around",
                background: "rgba(0,0,0,0.05)",
                borderRadius: "8px",
              }}
            >
              {myTools?.map((tool) => (
                <li className="listItem">
                  <Chip
                    label={tool}
                    onDelete={(e) => {
                      e.preventDefault();
                      const results = [];
                      myTools.forEach((item) => {
                        if (item !== tool) {
                          results.push(item);
                        }
                      });
                      setMyTools(results);
                    }}
                  ></Chip>
                </li>
              ))}
            </ul>
            Add a certification:
            <div style={{ margin: "20px" }}>
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
                  if (!newCert) {
                    return;
                  }
                  const currentCerts = myCerts;
                  setMyCerts([...currentCerts].concat(newCert));
                  setNewCert("");
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography component="h3" variant="caption">
              My Certifications:
            </Typography>
            <ul
              id="certList"
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "space-around",
                background: "rgba(0,0,0,0.05)",
                borderRadius: "8px",
              }}
            >
              {myCerts?.map((cert) => (
                <li className="listItem">
                  <Chip
                    label={cert}
                    onDelete={(e) => {
                      e.preventDefault();
                      const results = [];
                      myCerts.forEach((item) => {
                        if (item !== cert) {
                          results.push(item);
                        }
                      });
                      setMyCerts(results);
                    }}
                  ></Chip>
                </li>
              ))}
            </ul>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginBottom: "40px", marginTop: "40px" }}
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
