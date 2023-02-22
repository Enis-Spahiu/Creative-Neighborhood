import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
// eslint-disable-next-line
import { styled, useTheme } from '@mui/material/styles';
// eslint-disable-next-line
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';


const List = (props) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "black",
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: "#faf8ff",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      
      
      const [events,setEvents] = useState([]);
      const navigate=useNavigate()
      useEffect(()=>{
        axios.get('http://localhost:8000/api/getAllEvents')
            .then((res)=>{
                // console.log(res.data)
                setEvents(res.data)
            })
            .catch((err)=>console.log(err))
            
      // eslint-disable-next-line
      },[])
      

      const removeEvent = (eventId) => {
        axios.delete(`http://localhost:8000/api/deleteEvent/${eventId}`,{
            withCredentials:true
        })
        .then((res) => {
            console.log(res)
            const newList = events.filter((event,index) => event._id !== eventId)
            setEvents(newList)
        })
        .catch((error) => {
            console.log(error)
            if(error.response.status === 401){
                navigate('/')
            }
        })
    }

      
  return (
    <div style={{width: "100%", height: "fit-content"}}>
        <TableContainer component={Paper} sx={{ borderRadius:'25px', width:"95%" }}>
            <Table sx={{ minWidth: 650}} aria-label="customized table">
              <TableHead>
                <TableRow >
                  <StyledTableCell sx={{fontSize:"200%", fontFamily:"Bebas Neue"}}>Event Listings</StyledTableCell>
                  <StyledTableCell sx={{fontSize:"200%", fontFamily:"Bebas Neue"}} align="right">Date</StyledTableCell>
                  <StyledTableCell sx={{fontSize:"200%", fontFamily:"Bebas Neue", pl:-20}} align="right"> </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event,index)=>(
                  <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                    <Link component={RouterLink} to={`/detail/${event._id}`} sx={{fontSize:"200%", fontFamily:"Abel"}} style={{color:"black"}}>{event.title}</Link>
                    </StyledTableCell>
                    <StyledTableCell style={{fontSize:"130%"}} align="right">
                        {(new Date(event.date)).toLocaleDateString('en-us')}
                    </StyledTableCell>
                    <StyledTableCell style={{fontSize:"130%", pl:-20}} align="right">
                      <DeleteIcon style={{cursor: "pointer"}} onClick={() => removeEvent(event._id)}/>
                    </StyledTableCell>
                    </StyledTableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default List