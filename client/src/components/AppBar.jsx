import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import AppContext from '../hooks/context';
import { Navigate } from 'react-router-dom';

export default function AppMenuBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedOut, setLoggedOut] = React.useState(false);
  const { setUser } = React.useContext(AppContext);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event.target.innerText === 'Log Out') {
      axios
        .get('api/logout')
        .then(() => {
          setLoggedOut(true);
          setUser(null);
        })
    }
    setAnchorEl(null);
  };

  if (loggedOut) {
    return (<Navigate to="/"/>)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="background-appbar" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b>Help Me Out</b>
          </Typography>
            <div>
              <IconButton
                className="account-button"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle className='accountI-icon'/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} key='Log Out'>Log Out</MenuItem>
                <MenuItem onClick={handleClose}>My Account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}