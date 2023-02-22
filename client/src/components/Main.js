import React from 'react'
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from './List';
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
        main: "linear-gradient(125deg, #b651b0 0%, #ff947a 100%)",
        mainChannel: "0 0 0",
      }
    }
  });


const Main = () => {
  return (
    <ThemeProvider theme={theme}>
              <Home/>
        <Grid container spacing={2} flexGrow={1} sx={{ background: (theme) => theme.palette.gradient.main, height:"100vh"}}>
            <Grid item xs={0.5} sx={{my:8}}>

            </Grid>
            <Grid item xs={5.5} sx={{my:8}}>
                <List/>
            </Grid>
            <Grid item xs={5.5} sx={{ my:8}}>
                <Typography align='left' variant='h1' sx={{fontFamily: "Bebas Neue", color:"white"}}>Welcome to Creative Neighborhood!</Typography>
                <Typography align='left' variant='h4' sx={{fontFamily: "Abel", pb:3}} >A space designed to captivate creative minds, and build a stronger community in the world of art. We believe in the importance community building, and strive to do so though visual communications and artistic workmanship. Share your gifts with your neighbors, and join us to achieve a brighter community one paint stroke at a time.</Typography>
            </Grid>
        </Grid>
    </ThemeProvider>
  )
}

export default Main