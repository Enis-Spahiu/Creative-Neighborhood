import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const AddComment = () => {

    const [comment,setComment] = useState('')
    const [event,setEvent] = useState([])
    const [errorMessage, setErrorMessage]= useState("")
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getEvent/${id}`)
            .then((res)=>{
                console.log(res.data)
                setEvent(res.data)
            })
            .catch((err)=>console.log(err))
    },[])


    const addComment = event =>{
        event.preventDefault();
        axios.post("http://localhost:8000/api/comments",{
            comment:comment,
            event:event._id
        },
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.cookie);
            console.log(res);
            console.log(res.data, "is res data!");
            navigate("/list");
        })
        .catch(err=>{
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        })
    }

    return (
        <form onSubmit={addComment}>
            <label>Add Comment:</label>
            <input type='text' onChange={(e)=>setComment(e.target.value)}/>
            <button type='submit'>Post</button>
        </form>
    )
}

export default AddComment