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
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./styles.css";



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme({
    palette:{
      login:{
        main: "#f75f84",
        contrastText:"#FFFFFF"
      },
      validate:{
          color: "#ff0002"
      }
    }
  });


  export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errorMessage, setErrorMessage]= useState("")
    const navigate = useNavigate()

    const handleSubmit = event =>{
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",{
            email:email,
            password:password,
        },
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.cookie);
            console.log(res);
            console.log(res.data, "is res data!");
            navigate("/home");
        })
        .catch(err=>{
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        })
    }

    return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
                  <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                      backgroundImage: 'url(https://media.illustrationx.com/images/artist/CarolinaRodriguezFuenmayor/144045/full/500/3794-144045.jpg)',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
            <CssBaseline />
              <Grid item xs={12} sm={8} md={5} component={Paper}  elevation={6} square>
                <Box
                  sx={{
                    my: 22,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{fontFamily:"Bebas Neue", fontSize:"500%", mt:-10, mb:7}}>Creative Neighborhood</Typography>
                  <Avatar sx={{ m: 1, bgcolor: '#f75f84' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Typography color="red">
                    {errorMessage ? "Data is not correct!" : ""}
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      className="inputRounded"
                      variant="outlined"
                      sx={{bgcolor:"white", borderRadius:"25px"}}
                      onChange={(e)=>setEmail(e.target.value)}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      className="inputRounded"
                      variant="outlined"
                      sx={{bgcolor:"white", borderRadius:"25px"}}
                      onChange={(e)=> setPassword(e.target.value)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      color="login"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, borderRadius:"25px" }}
                    >
                      Sign in
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href='#' variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link component={RouterLink} to='/register' variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
          </Grid>
        </ThemeProvider>
      );
    }