import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import "./styles.css";
import Home from './Home';




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

  export default function AddEvent() {

    const [events,setEvents] = useState({
        title: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        wheelchair: true,
        type: ''
    })


    const onChangeHandlerWheelchair = (event) => {
        console.log("On change handler");
        const newState = {
            ...events,
            wheelchair: !events.wheelchair,
        };
        setEvents(newState);
    };
    const navigate = useNavigate()

  const [errs, setErrs]= useState([]);

    const onChangeHandler = (e)=>{
        setEvents({
            ...events,
            [e.target.name]: e.target.value
        })
    }
    
    const submitHandler = (e) =>{
    e.preventDefault()
        axios.post('http://localhost:8000/api/createEvent',events,{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res)
            navigate('/home');
            setErrs({});
        })
        .catch((err)=>{
            console.log(err)
            setErrs(err.response.data.err.errors)
            if(err.response.status === 401) {
                navigate('/')
            }
        })
}



  return (
<ThemeProvider theme={theme}>
<Home/>
    <Grid container sx={{ background: (theme) => theme.palette.gradient.main, height:"100vh", mt:-2}}>
      <Container component="main" sx={{bgcolor:"white", my:6, height:"90vh", borderRadius:"25px"}} maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{fontFamily:"Bebas Neue", fontSize:"250%", mt:-5}}>
            Add event
          </Typography>
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                  variant="outlined"
                  sx={{bgcolor:"white", borderRadius:"25px"}}
                  onChange={(e)=> onChangeHandler(e)}
                  id="title"
                  label="Event title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                />
                {
                    errs.title ?
                        <Typography color="red">{errs.title.message}</Typography>
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
                  onChange={(e)=> onChangeHandler(e)}
                  name="desc"
                  label="Event Description"
                  id="desc"
                  autoComplete="desc"
                />
                {
                    errs.desc ?
                        <Typography color="red">{errs.desc.message}</Typography>
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
                  onChange={(e)=> onChangeHandler(e)}
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                />
                {
                    errs.location ?
                        <Typography color="red">{errs.location.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12} sx={{mb:4, mt:2}}>
              <select className='form-control' style={{borderRadius:"25px", height:"170%"}}  name='type' onChange={onChangeHandler}>
                        <option value='select'>Select type:</option>
                        <option value='inperson'>In Person Event</option>
                        <option value='online'>Virtual Event</option>
                    </select>
              </Grid>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  className="inputRounded"
                    variant="outlined"
                    sx={{bgcolor:"white", borderRadius:"25px"}}
                    name="date"
                    type="date"
                    id="date"
                    onChange={(e)=> onChangeHandler(e)}
                />
                {
                    errs.date ?
                        <Typography color="red">{errs.date.message}</Typography>
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
                  onChange={(e)=> onChangeHandler(e)}
                  name="time"
                  label="Time"
                  id="time"
                  autoComplete="time"
                />
                {
                    errs.time ?
                        <Typography color="red">{errs.time.message}</Typography>
                        :null
                }
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  onClick={onChangeHandlerWheelchair}
                  name="wheelchair"
                  label="Wheelchair Accessible"
                />
              </Grid>
            </Grid>
            <Button
                  type="submit"
                  color="login"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, borderRadius:"25px", fontFamily:"Bebas Neue", fontSize:"160%" }}
                >
                  Submit
                </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
      </Grid>
    </ThemeProvider>
  );
}