import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {Link } from 'react-router-dom'

const Register = () => {
    const [confirmReg, setConfirmReg]=useState('');
    const [errs, setErrs]= useState([]);
    const [user, setUser]= useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const register = e=>{
        e.preventDefault()

        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials:true,
        })
        .then(res=>{
            console.log(res.data);
            setUser({
                username:"",
                email:"",
                password:"",
                confirmPassword:""
            })

            setConfirmReg("Thank you for registering, you can now log in!");
            setErrs({});
        })
        .catch((err)=>{
            console.log(err);
            setErrs(err.response.data.errors)
        })
    }
    
    return (
        <div style={{width:"20%", marginLeft:"750px"}} className='col justify-content-around bg-warning'>
            <h2>Register</h2>
            {
                confirmReg ?
                    <h4 style={{color:"green"}}>{confirmReg}</h4>
                    :null
            }
            <form onSubmit={register}>
                <div className='mr-2'>
                    <label>Username:</label>
                    {
                        errs.username ?
                            <span className='error-text'>{errs.username.message}</span>
                            :null
                    }
                    <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div className='ml-3 pl-2'>
                    <label>Email:</label>
                    {
                        errs.email ?
                            <span className='error-text'>{errs.email.message}</span>
                            :null
                    }
                    <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    {
                        errs.password ?
                            <span className='error-text'>{errs.password.message}</span>
                            :null
                    }
                    <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    />
                </div>
                <div style={{marginLeft:'-30px'}}className='mr-2 pr-2'>
                    <label>Confirm Password:</label>
                    {
                        errs.confirmPassword ?
                            <span className='error-text'>{errs.confirmPassword.message}</span>
                            :null
                    }
                    <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    />
                </div>
                <div className='center'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register