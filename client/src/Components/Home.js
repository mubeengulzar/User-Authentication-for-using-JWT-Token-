import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [logedInUser,setLogedInUser]=useState('');
  const navigate= useNavigate();

  useEffect(()=>{
    setLogedInUser(localStorage.getItem('logedInUser'))
        },[])

  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('logedInUser');
    setTimeout(()=>{
      navigate('/login');

    },1000)
  }
  return (
    
    <div>
    <h1>
      Welcome to Home Page {logedInUser}

    </h1>
    <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Home