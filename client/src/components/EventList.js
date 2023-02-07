import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const EventList = () => {

    const [events,setEvents] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:8000/api/getAllEvents')
            .then((res)=>{
                console.log(res.data)
                setEvents(res.data)
            })
            .catch((err)=>console.log(err))
    },[])

    function linkHandler(e){
        navigate("/form")
    }

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
        <div className='col d-inline-block justify-content-center'>
            <div className='ml-5 container bg-warning row d-flex-inline justify-content-around'>
                <h1 className='display-3'>Events</h1>
                <button className='btn btn-light mt-5 mb-5' onClick={linkHandler}>
                    Add Event 
                </button>
                {
                    events.map((event,index)=>{
                        return <div key={index} style={{backgroundColor:"#FFE694"}} className='container border rounded-3 mt-2 mb-3 d-inline-flex'>
                            <div className='col'>
                                <Link to={`/list/${event._id}`} style={{fontSize:"1.6em", color:"black"}}>{event.title}</Link>
                                <div className='d-flex-inline justify-content-between mt-5'>
                                    <button className='stats-btn-three border border-danger border-5 rounded-pill ml-2' onClick={() => removeEvent(event._id)}>Remove Event</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default EventList