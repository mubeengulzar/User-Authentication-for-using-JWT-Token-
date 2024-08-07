import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utili'

function Signup() {

    const [signupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:'',
    })

    const navigate=useNavigate();
    
     const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copyinfo={...signupInfo}
        copyinfo[name]=value;
        setSignupInfo(copyinfo);
     }
     console.log(signupInfo);


   const  handleSignup=async(e)=>{
    e.preventDefault();
    const {name,email,password}=signupInfo;
    if(!name||!email||!password){
        return handleError('name ,email and password are required')

    }
    try{
        const url="http://localhost:8000/auth/signup";
       const  Response=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo)
       });
       const data=await Response.json();
       const {success,message,error}=data;
       if(success){
        handleSuccess(message);
        setTimeout(()=>{
            navigate('/login')

        },1000)
       }
       else if(error){
        const detail=error?.detail[0].message;
        handleError(detail)
       }
       else if(!success){
        handleError(message);
       }
       console.log(data);
    }catch(e){
        handleError(e);
    }

   }


  return (
    <div className='container'>
        <h1>SignUp</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                onChange={handleChange}
                type='text'
                name='name'
                autoFocus
                placeholder='Enter Your Name..'
                value={signupInfo.name}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter Your email..'
                value={signupInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter Your Password..'
                value={signupInfo.password}
                />
            </div>
            <button type='submit'>SignUp</button>
            <span>Already have an Account ? 
                <Link to="/login">Login</Link>
            </span>
        </form>
        <ToastContainer/>

    </div>
  )
}

export default Signup