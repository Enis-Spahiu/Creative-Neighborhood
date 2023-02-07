import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Form = () => {
    const [events,setEvents] = useState({
        title: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        wheelchair: true,
        type: ''
    })
    const navigate = useNavigate()
    const [beErrors,setBeErrors] = useState('')
    const [feErrors,setFeErrors] = useState('')

    const onChangeHandlerWheelchair = (event) => {
        console.log("On change handler");
        const newState = {
            ...events,
            wheelchair: !events.wheelchair,
        };
        setEvents(newState);
    };
    // const onChangeHandlerInPerson = (event) => {
    //     console.log("On change handler");
    //     const newState = {
    //         ...events,
    //         inPerson: !events.inPerson,
    //     };
    //     setEvents(newState);
    // };
    // const onChangeHandlerOnline = (event) => {
    //     console.log("On change handler");
    //     const newState = {
    //         ...events,
    //         online: !events.online,
    //     };
    //     setEvents(newState);
    // };

    function onChangeHandler(e){
        setEvents({
            ...events,
            [e.target.name]: e.target.value
        })
        if (e.target.value.length < 3 && (e.target.name === "title" || e.target.name === "location" || e.target.name === "desc")){
            setFeErrors("(*) Mandatory fields can't be less than 3 characters!");
        }
        else {
            setFeErrors("");
        }
    }
    function linkHandler(e){
        navigate("/list")
    }

    function submitHandler(e){
        e.preventDefault()
        if (events.title === "" || events.location === "" || events.time === "" || events.desc === ""){
            setBeErrors("(*) Mandatory fields can't be empty!");
        }
        else if ( (events.title.length < 3 && events.location === "") || (events.title.length < 3 && events.title === "") || (events.desc.length < 3 && events.desc === "")){
            setFeErrors("(*) Mandatory fields can't be less than 3 characters!");
        }
        else if (feErrors !== "" && beErrors !== ""){
            navigate("/createEvent");
        }
        else{ 
            axios.post('http://localhost:8000/api/createEvent',events,{
                withCredentials:true
            })
            .then((res)=>{
                console.log(res)
                navigate('/list')
            })
            .catch((err)=>{
                console.log(err.response.status)
                if(err.response.status === 401) {
                    navigate('/')
                }
            })
        }
    }

    return (
        <div className='col-6 mx-auto'>
            <div className='container bg-secondary bg-gradient p-4 row d-inline-flex justify-content-around'>
                <h1 className='display-3'>Add Event</h1>
                <button className='btn btn-info mt-5 mb-5' onClick={linkHandler}>
                    Event List
                </button>
            </div>
            <form onSubmit={submitHandler} className='row containter p-4 bg-warning'>
                <div className='col'>
                    <label className='form-label'>Event Title:</label>
                    <input type='text' className='form-control' name='title' onChange={onChangeHandler}/>
                    <label className='form-label'>Location:</label>
                    <input type='text' className='form-control' name='location' onChange={onChangeHandler}/>
                    <label className='form-label'>Event Description:</label>
                    <input type='text' className='form-control' name='desc' onChange={onChangeHandler}/>
                    <label className='form-label'>Date:</label>
                    <input type='date' className='form-control' name='date' onChange={onChangeHandler}/>
                    <label className='form-label'>Time:</label>
                    <input type='text' className='form-control' name='time' onChange={onChangeHandler}/>
                </div>
                <div className='col'>
                    <label className='form-label'>Type:</label>
                    <select className='form-control'  name='type' onChange={onChangeHandler}>
                        <option value='select'>Select type:</option>
                        <option value='inperson'>In Person</option>
                        <option value='online'>Online</option>
                    </select>
                    <div>
                        <input type='checkbox' className='form-check-input' name='wheelchair' value='Wheelchair' checked={events.wheelchair} onClick={onChangeHandlerWheelchair}/>
                        <label>Wheelchair Accessible</label><br/>
                        {/* <input type='checkbox' className='form-check-input' name='patch' value='Eye Patch' checked={pirates.patch} onClick={onChangeHandlerEyePatch}/>
                        <label>Eyepatch</label><br/>
                        <input type='checkbox' className='form-check-input' name='hook' value='Hook' checked={pirates.hook} onClick={onChangeHandlerHookHand}/>
                        <label>Hook</label><br/> */}
                    </div>
                    <button className='btn btn-success mt-5'>Add Event</button>
                </div>
            </form>
            <div>
                <p>Front end errors:</p>
                {
                        feErrors ? <p style={{color:"red", fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>{feErrors}</p> : ''
                    }
            </div>
            <div>
                <p>Back end errors:</p>
                {
                        beErrors ? <p style={{color:"red", fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>{beErrors}</p> : ''
                    }
            </div>
        </div>
    )
}

export default Form