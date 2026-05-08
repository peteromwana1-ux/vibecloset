import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

  // declaring state variables
  const[email,setEmail] =useState("")
  const[password,setPassword] =useState("")
  // status messages
  const [loading,setLoading]=useState("")
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")
  // navigation
  const navigate=useNavigate()
  const handleSignin =async(e) =>{
      e.preventDefault()
      setLoading("please wait...")
      try{
      // retrieving user data
      const formData =new FormData();
      formData.append("email",email)
      formData.append("password",password)
      // adding base url
      const response = await axios.post("https://peterson.alwaysdata.net/api/signin",formData);
      if(response.data.user){
        setSuccess(response.data.message)
        setLoading("")
        localStorage.setItem("user",JSON.stringify(response.data.user))
        localStorage.setItem("isLoggedIn", "true")
        // navigation on successful sign in 
        navigate("/")

      }
      }catch (error){
        setError(error.message || error)
        setLoading("")
      }
  }


  return (
    <div className='hero'>
    <div className='row justify-content-center'>
      <div className='card shadow m-2 p-4 col-md-6'>
        <h1>SIGN IN</h1>
        
        {loading}<br />
        {error}<br />
        {success}<br />
        <form action="" onSubmit={handleSignin}>
          <input type="email" placeholder='Enter your email'onChange={(e)=>setEmail(e.target.value)}required/>
          <br /><br />
          <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}required/>
          <br />
          <input type="submit"value='log in'required className='btn'/>
          {/* incase one does not have an account*/}
          <p>Don't have an account? <Link to='/Signup'>signup</Link></p>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Signin
