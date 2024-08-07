import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utili'


function Login() {


  const [loginInfo,setLoginInfo]=useState({
    email:'',
    password:'',
})

const navigate=useNavigate();
const handleChange=(e)=>{
  const {name,value}=e.target;
  console.log(name,value);
  const copyinfo={...loginInfo}
  copyinfo[name]=value;
  setLoginInfo(copyinfo);
}
console.log(loginInfo);


const  handleLogin=async(e)=>{
e.preventDefault();
const {email,password}=loginInfo;
if(!email||!password){
  return handleError('email and password are required')

}
try{
  const url="http://localhost:8000/auth/login";
 const  Response=await fetch(url,{
  method:"POST",
  headers:{
      'Content-Type':'application/json'
  },
  body:JSON.stringify(loginInfo)
 });
 const data=await Response.json();
 const {success,message,jwtToken , name , error}=data;
 if(success){
  localStorage.setItem('token',jwtToken);
  localStorage.setItem('logedInUser',name);
  handleSuccess(message);
  setTimeout(()=>{
      navigate('/home')

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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            
            <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter Your email..'
                value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter Your Password..'
                value={loginInfo.password}
                />
            </div>
            <button type='submit'>Login</button>
            <span>Don't  have an Account ? 
                <Link to="/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer/>

    </div>
  )
}

export default Login