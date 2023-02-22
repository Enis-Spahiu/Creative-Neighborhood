import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { styled} from '@mui/material/styles';
import { Divider, Typography, Paper, TextField } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PublicIcon from '@mui/icons-material/Public';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Home from './Home'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

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



const NewDetail = () => {




    const {id} = useParams()
    const [event,setEvent] = useState({})
    const [comment,setComment] = useState('')
    // eslint-disable-next-line
    const [commentList,setCommentList] = useState([])
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getEvent/${id}`)
            .then((res)=>{
                console.log(res.data)
                setEvent(res.data)

            })
            .catch((err)=>console.log(err))
            // eslint-disable-next-line
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comments`)
            .then((res)=>{
                console.log(res.data)
                setCommentList(res.data)

            })
            .catch((err)=>console.log(err))
    },[])


    const addComment = e =>{
        axios.post("http://localhost:8000/api/comments",{
            comment:comment,
            event:event._id
        },
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(comment)
            console.log(res.cookie);
            console.log(res);
            console.log(res.data, "is res data!");
        })
        .catch(err=>{
            console.log(err.response);
        })
    }


  return (
    <ThemeProvider theme={theme}>
                <Home/>
        <Main>
            <div className='d-flex flex-column justify-content-start' style={{height: "fit-content", width: "100%"}}>
                    <div className='d-flex flex-column p-3' style={{height: "35%", width: "100%"}}>
                    <Typography variant="h2" sx={{fontSize:"4rem", pl:6}} component="h2" align='left'>{event.title}</Typography >
                    </div>
                    <Divider className='ms-3 my-3' style={{width: "98%"}}/>
                    <Grid container spacing={2} flexGrow={1}>
                        <Grid item xs={0.4}/>
                        <Grid item xs={5.6}>
                            {event.user_id ?
                                        (
                                            <Grid container spacing={2} sx={{mt:1}}>
                                            <Avatar src="/static/images/avatar/2.jpg" sx={{ml:1.6}}/>
                                            <Typography variant="h4" sx={{fontSize:"1.8rem", ml:2}} align="left"> {event.user_id.username}</Typography>
                                        </Grid>
                                        )
                                        :null
                                    }
                            <Typography align='left' sx={{fontSize:"1.2rem"}}>Date: {(new Date(event.date)).toLocaleDateString('en-us')} <KeyboardArrowRightIcon fontSize='large'/> {event.time} </Typography>
                        </Grid>
                        <Grid item xs={6}/>
                    </Grid>
                    <div className='d-flex flex-column p-3' style={{height: "65%", width: "100%"}}>
                    </div>
                </div>
        </Main>
        <Grid container spacing={2} flexGrow={1}>
            <Grid item xs={0.5}/>
            <Grid item xs={5.5}>
                <Paper elevation={6} sx={{mb:3, pl:2, borderRadius:"25px"}}>
                    <Typography variant='h3' sx={{fontSize:"2.2rem", mb:2, pt:1}} align="left">Description:</Typography>
                    <Typography sx={{fontSize:"1.2rem", pb:1, pr:1}}  align="left">{event.desc}</Typography>
                </Paper>
                <Paper elevation={6} sx={{pl:2, borderRadius:"25px"}}>
                    <Typography variant='h2' align='left' sx={{fontSize:"2.2rem"}}>Comments</Typography >
                    <Box component="form" onSubmit={addComment}>
                        <Grid container flexGrow={1} >
                            <Grid item xs={8}>
                            <TextField
                            fullWidth
                            margin="normal"
                            className="inputRounded"
                            variant="outlined"
                            sx={{bgcolor:"white", borderRadius:"25px", maxWidth:"sm"}}
                            onChange={(e)=>setComment(e.target.value)}
                            id="comment"
                            label="Add Comment"
                            name="comment"
                            autoComplete="comment"/>
                            </Grid>
                            <Grid xs={1.5}>
                            <Button type="submit" variant="filled" sx={{bgcolor:"black", color:"white", my:2.3, borderRadius:"25px", fontSize:"1.4rem", fontWeight:"600"}}>Post</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {event.comments ?(
                            <Paper style={{ padding: "40px 20px" }}>
                                {event.comments.map((comment, index) =>(
                                    <>
                                    <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar alt="Remy Sharp"/>
                                    </Grid>
                                    <Grid justifyContent="left" item xs zeroMinWidth>
                                        <p style={{ textAlign: "left" }}>
                                            {comment.comment}
                                        </p>
                                    </Grid>
                                    </Grid>
                                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                                    </>
                                    ))
                                }
                            </Paper>
                        ):null
                    }
                </Paper>
            </Grid>
            <Grid item container xs={6}>
                <Grid xs={3}></Grid>
                <Grid xs={6.5}>
                    <Button fullWidth align="left" size="large" variant="filled" sx={{borderRadius:"25px", fontSize:"3.5rem", fontFamily:"Bebas Neue",color:"white", pr:8, pl:8, mb:5, bgcolor:"#f75f84"}}>Join</Button><br/>
                    <Typography xs={5} variant="h3" sx={{fontSize:"2.2rem", ml:2, mb:5, color:"grey"}} align="left"><PublicIcon sx={{fontSize:"2.2rem"}}/> Type: {event.type === 'inperson' ? "In Person Event": "Virtual Event"}</Typography>
                    <Typography xs={5} variant="h3" sx={{fontSize:"2.2rem", ml:2, mb:5, color:"grey"}} align="left"><AccessibleIcon sx={{fontSize:"2.8rem", mr:-0.8}}/> Wheelchair Accessible: {event.wheelchair === 'true' ? 'Yes': 'No'}</Typography>
                    {event.user_id ?
                            (
                            <>
                                <Typography xs={5} variant="h3" sx={{fontSize:"2.2rem", ml:2, color:"grey"}} align="left"><AlternateEmailIcon sx={{fontSize:"2.2rem"}}/> Contact: {event.user_id.email} </Typography>
                            </>
                            )
                            :null
                        }
                </Grid>
                <Grid xs={0}></Grid>
            </Grid>
        </Grid>
    </ThemeProvider>
    
  )
}

export default NewDetail