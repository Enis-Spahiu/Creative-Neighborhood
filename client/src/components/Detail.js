import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Detail = () => {

    const {id} = useParams()
    const [event,setEvent] = useState({})
    const navigate = useNavigate()
    const [comment,setComment] = useState('')
    const [errorMessage, setErrorMessage]= useState("")
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getEvent/${id}`)
            .then((res)=>{
                console.log(res.data)
                setEvent(res.data)

            })
            .catch((err)=>console.log(err))
    },[])

    function list(){
        navigate('/list')
    }

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
            navigate(`/list`);
        })
        .catch(err=>{
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        })
    }
    
    return (
        <>
                <button onClick={list}>Back to list</button>
            <div className='row  bg-warning'>
                <div className='col'>
                    <h1 className='display-1'>{event.title}</h1>
                        {event.user_id ?
                            (
                            <>
                                <h3>Added by: {event.user_id.username}</h3>
                                <h3>Organizers email: { event.user_id.email}</h3>
                            </>
                            )
                            :null
                        }
                    <h2>Description: {event.desc}</h2>
                </div>
                <div className='col'>
                    <h3>Wheelchair Accessible: {event.wheelchair === 'true' ? 'Yes': 'No'}</h3>
                    <h3>Type: {event.type === 'inperson' ? "In person": "Online"}</h3>
                    <h3>Date: {(new Date(event.date)).toLocaleDateString('en-us')}</h3>
                    <h3>Time: {event.time}</h3>
                    <h3>Location: {event.location}</h3>
                </div>
            </div>
                    <h2>Comment Section:</h2>
                        {event.comments ?(
                            <>
                            {
                                event.comments.map((comment, index) =>(
                                    <div style={{backgroundColor:"#FFE694"}}className='border m-2 p-2' key={"comment_" + index}>
                                        <h5>{comment.comment} </h5>
                                    </div>
                                ))
                            }
                            </>
                        ):null
                    }
            <form onSubmit={addComment}>
                <label style={{marginRight:"5px"}} >Add Comment:</label>
                <input type='text' onChange={(e)=>setComment(e.target.value)}/>
                <button style={{marginLeft:"5px"}} className="btn btn-secondary" type='submit'>Post</button>
            </form>
        </>
    )
}

export default Detail