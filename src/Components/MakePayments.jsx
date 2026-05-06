import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'
import axios from 'axios';
const MpesaPayment = () => {
  // declaring state variable
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  if (!product) {
    return <div className="page">No product selected for payment.</div>;
  }

  // image url
  const img_url = "https://peterson.alwaysdata.net/static/images/"
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("Please wait as we process the transaction")
    setError("")
    try {
      // retrieving user and product details
      const formData = new FormData()
      formData.append("phone", phone)
      formData.append("amount", product.product_cost)
      // adding base url
      const response = await axios.post("https://peterson.alwaysdata.net/api/mpesa_payment", formData)
      console.log(response.data)
      setMessage("Payment request sent. Please complete the transaction on your phone.")
    } catch (error) {
      setError(error.message)
      setMessage("")
    }
  }

  return (
    <div className='row justify-content-center mb-4'>
      <h1>Lipa Na Mpesa</h1>
      <div className='col-md-3 card shadow m-4 p-4'>
        <img src={img_url + product.product_photo} alt={product.product_photo} />
        <p>product name :  {product.product_name}</p>
        <p className='text-warning'>product cost:  $. {product.product_cost}</p>
        {/* binding variables */}
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
        {/* phone input */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="">phone number</label>
          <input
            type="tel"
            placeholder='enter phone number'
            className='form-control'
            value={phone}
            onChange={(e) => setPhone(e.target.value)} /><br />

          <button className='btn' type="submit">
            Make Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default MpesaPayment

