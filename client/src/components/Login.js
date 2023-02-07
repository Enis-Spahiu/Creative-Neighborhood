import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errorMessage, setErrorMessage]= useState("")
    const navigate = useNavigate()

    const login = event =>{
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
            navigate("/list");
        })
        .catch(err=>{
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <p>{errorMessage ? errorMessage : ""}</p>
            <form style={{width:"20%", backgroundColor:"#FFE694"}}className='border border-5 border-warning container pt-3 pb-3' onSubmit={login}>
                <div className='ml-4'>
                    <label>Email: </label>
                    <input
                    type="email"
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                    type="password"
                    name="password"
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login