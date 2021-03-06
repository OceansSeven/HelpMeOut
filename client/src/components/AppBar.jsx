import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";
import AppContext from "../hooks/context";
import { Link, Navigate } from "react-router-dom";



export default function AppMenuBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const { setUser } = React.useContext(AppContext);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event.target.innerText === "Log Out") {
      axios.get("api/logout").then(() => {
        setLoggedOut(true);
        setUser(null);
      });
    }
    setAnchorEl(null);
  };

  if (loggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        id="background-appbar"
        position="static"
        style={{ position: "fixed", top: "0", zIndex: "900", height: '56px'}}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className="appbar-text"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to="/main">
              <b>Help Me Out</b>
            </Link>
          </Typography>
          <div>
            <IconButton
              className="account-button"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ color: "white" }}
            >
              <AccountCircle className="accountI-icon" />
            <div style={{paddingLeft: '10px', fontSize: 'large', fontWeight: '500'}}>Menu</div>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px 20px",
                }}
              >
                <Link
                  to="/main"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleClose}>Home</MenuItem>
                </Link>
                <Link
                  to="/summary"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleClose}>Summary</MenuItem>
                </Link>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link
                  to="/messages"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleClose}>Messages</MenuItem>
                </Link>
                <div>
                  <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </div>
              </div>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{height: '56px', width: '100%'}}></div>
    </Box>
  );
}
