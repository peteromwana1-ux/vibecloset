import axios from 'axios'
import React, { useState } from 'react'

const AddCloset  = () => {
  // declaring state variables
  const[product_name,setProductName]= useState("")
  
  const[product_cost,setProductCost]= useState("")
  const[product_photo,setProductPhoto]= useState("")
// status messages
const[loading,setLoading]= useState("")
const[success,setSuccess]= useState("")
const[error,setError]= useState("")
  // function to add products to database

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading("please wait as we process your request")
try{
// retrieving product data
    const formData= new FormData();
    formData.append("product_name",product_name)
    formData.append("product_cost",product_cost)
    formData.append("product_photo",product_photo)
    // adding base url to post data
    const response = await axios.post("https://peterson.alwaysdata.net/api/add_product", formData)
    setLoading("")
    setSuccess(response.data.success)
  }catch(error){
setError(error.message)
  }
  }

  return (
    <div>
      <div className='row justify-content-center'>
    <div className='col-md-6 card shadow m-2 p-4'>
      {/* binding */}
      {loading}
      {success}
      {error}
      <h1>add to closet</h1>
        <form action='' onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder='product name' 
        onChange={(e)=>setProductName(e.target.value)}
        required/><br /><br />
        

        


        <input 
        type="number"  
        placeholder='product cost' 
        onChange={(e)=>setProductCost(e.target.value)}
        required/><br /><br />

        <input 
        type="file" 
        placeholder='product photo'
        onChange={(e)=>setProductPhoto(e.target.files[0])}
        required/>

        <input 
        type="submit" 
        value="add product" 
        
       />

</form>
      </div></div>

    </div>
  )
}

export default AddCloset
