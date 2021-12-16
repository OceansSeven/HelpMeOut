import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=JA2JdSP7wyg">
        Help Me Out
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [checked, setChecked] = React.useState(false);
  const [validData, setValidData] = React.useState(true);
  const [registered, setRegistered] = React.useState(false);
  const [userExists, setUserExists] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email');
    const password = data.get('password');
    const contractor = checked;
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const company = data.get('company');

    setValidData(true);
    setUserExists(false);

    if (
      email.includes('@') &&
      email.includes('.') &&
      password &&
      firstName &&
      lastName
    ) {
      axios({
        method: "POST",
        data: {
          email: data.get('email'),
          password: data.get('password'),
          contractor: checked,
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          company: data.get('company')
        },
        withCredentials: true,
        url: "http://localhost:3000/api/register",
      })
      .then(({ data }) => {
        // console.log(data);
        if (data === 'User Already Exists') {
          setUserExists(true);
        } else {
          axios
            .post('api/v1/text-mail', { email })
            .then(() => console.log('email sent!'))
          setRegistered(true);
        }
      });
    } else {
      setValidData(false);
    }
  };

  if (registered) {
    return (<Navigate to="/login"/>)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://upcloseaz.com/wp-content/uploads/2014/11/12781919_l.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#1565c0' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="company"
                    label="Company Name (optional)"
                    type="company"
                    id="company"
                    autoComplete="new-company"
                  />
                {!validData &&
                  <div style={{color: 'red', marginTop: '16px'}}>
                    Please enter valid information
                  </div>
                }
                {userExists &&
                  <div style={{color: 'red', marginTop: '16px'}}>
                    User already exists
                  </div>
                }
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" checked={checked} onClick={() => { setChecked(!checked); }}/>}
                    label="I am a contractor looking for jobs."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}