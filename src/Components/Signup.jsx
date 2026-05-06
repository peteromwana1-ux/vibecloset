import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  // declaring state varibles
  const [username, setUsername] = useState('')
  const [email, Setemail] = useState('')
  const [phone, Setphone] = useState('')
  const [password, Setpassword] = useState('')

  // status messages 
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  // function to submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading('please wait ...');
    try {
      // retrieving user details
      const formData = new FormData();
      formData.append("username", username)
      formData.append("email", email)
      formData.append("phone", phone)
      formData.append("password", password)
      console.log("testing")
      // adding BASE URL
      const response = await axios.post("https://peterson.alwaysdata.net/api/signup", formData);
      setSuccess(response.data.success)
    } catch (error) {
      setError(error)
    }
  }



  return (
    <div className='hero'>
      <div className='row justify-content-center'>
        <div className='card shadow m-2 p-4 col-md-6'>
          <h1>Sign up</h1>

          {loading}<br />
          {error}<br />
          {success}<br />
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} required />
            <br /><br />
            <input type="email" placeholder='enter email' onChange={(e) => Setemail(e.target.value)} required />
            <br /><br />
            <input type="tel" placeholder='Enter Phone Number ,eg(254xxxxxxxxx' onChange={(e) => Setphone(e.target.value)} required />
            <br />
            <br />
            <input type="password" placeholder='Enter password' onChange={(e) => Setpassword(e.target.value)} required />
            <br />
            <input type="submit" value="create account" className='btn' />
            <br />
            {/* incase one already has an existing account*/}
            <p>Already have an account? <Link to='/Signin'>signin</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
