import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {Link as RouterLink, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import "./styles.css";


  const theme = createTheme({
    palette:{
      login:{
        main: "#f75f84",
        contrastText:"#FFFFFF"
      },
      validate:{
          color: "#ff0002"
      },
      gradient:{
        main: "linear-gradient(-45deg, #b651b0 0%, #ff947a 100%)",
        mainChannel: "0 0 0",
      }
    }
  });

  export default function Register() {


    const navigate = useNavigate()
  const [errs, setErrs]= useState([]);
  const [user, setUser]= useState({
        name:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

  const handleChange = (e)=>{
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
}

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8000/api/users/register",
    user, {withCredentials: true})
    .then(res=>{
        console.log(res.data);
        navigate('/')
        setErrs({});
    })
    .catch((err)=>{
        console.log(err);
        setErrs(err.response.data.errors)
    })
  };

  return (
<ThemeProvider theme={theme}>
    <Grid container sx={{ background: (theme) => theme.palette.gradient.main, height:"100vh"}}>
      <Container component="main" sx={{bgcolor:"white", my:6, height:"90vh", borderRadius:"25px"}} maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#f75f84' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                  variant="outlined"
                  sx={{bgcolor:"white", borderRadius:"25px"}}
                  onChange={(e)=> handleChange(e)}
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                {
                    errs.name ?
                        <Typography color="red">{errs.name.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                  variant="outlined"
                  sx={{bgcolor:"white", borderRadius:"25px"}}
                  onChange={(e)=> handleChange(e)}
                  id="lastname"
                  label="Last name"
                  name="lastname"
                  autoComplete="lastname"
                />
                {
                    errs.lastname ?
                        <Typography color="red">{errs.lastname.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                  variant="outlined"
                  sx={{bgcolor:"white", borderRadius:"25px"}}
                  onChange={(e)=> handleChange(e)}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
                {
                    errs.username ?
                        <Typography color="red">{errs.username.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                      variant="outlined"
                      sx={{bgcolor:"white", borderRadius:"25px"}}
                  onChange={(e)=> handleChange(e)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {
                    errs.email ?
                        <Typography color="red">{errs.email.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                      variant="outlined"
                      sx={{bgcolor:"white", borderRadius:"25px"}}
                  value={user.password}
                  onChange={(e)=> handleChange(e)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {
                    errs.password ?
                        <Typography color="red">{errs.password.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                      variant="outlined"
                      sx={{bgcolor:"white", borderRadius:"25px"}}
                  value={user.confirmPassword}
                  onChange={(e)=> handleChange(e)}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                />
                {
                    errs.confirmPassword ?
                        <Typography color="red">{errs.confirmPassword.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
                  type="submit"
                  color="login"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, borderRadius:"25px" }}
                >
                  Sign up
                </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to='/' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Grid>
    </ThemeProvider>
  );
}