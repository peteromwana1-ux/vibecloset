// // import React, { useState } from 'react'

// // import { useLocation } from 'react-router-dom'
// // import axios from 'axios';
// // const MpesaPayment = () => {
// //   // declaring state variable
// //   const { product } = useLocation().state || {};
// //   const [phone, setPhone] = useState("")
// //   const [message, setMessage] = useState("")
// //   const [error, setError] = useState("")

// //   if (!product) {
// //     return <div className="page">No product selected for payment.</div>;
// //   }

// //   // image url
// //   const img_url = "https://peterson.alwaysdata.net/static/images/"
// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setMessage("Please wait as we process the transaction")
// //     setError("")
// //     try {
// //       // retrieving user and product details
// //       const formData = new FormData()
// //       formData.append("phone", phone)
// //       formData.append("amount", product.product_cost)
// //       // adding base url
// //       const response = await axios.post("https://peterson.alwaysdata.net/api/mpesa_payment", formData)
// //       console.log(response.data)
// //       setMessage("Payment request sent. Please complete the transaction on your phone.")
// //     } catch (error) {
// //       setError(error.message)
// //       setMessage("")
// //     }
// //   }

// //   return (
// //     <div className='row justify-content-center mb-4'>
// //       <h1>Lipa Na Mpesa</h1>
// //       <div className='col-md-3 card shadow m-4 p-4'>
// //         <img src={img_url + product.product_photo} alt={product.product_photo} />
// //         <p>product name :  {product.product_name}</p>
// //         <p className='text-warning'>product cost:  $. {product.product_cost}</p>
// //         {/* binding variables */}
// //         {message && <p className="text-success">{message}</p>}
// //         {error && <p className="text-danger">{error}</p>}
// //         {/* phone input */}
// //         <form onSubmit={handleSubmit}>
// //           <label htmlFor="">phone number</label>
// //           <input
// //             type="tel"
// //             placeholder='enter phone number'
// //             className='form-control'
// //             value={phone}
// //             onChange={(e) => setPhone(e.target.value)} /><br />

// //           <button className='btn' type="submit">
// //             Make Payment
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // export default MpesaPayment
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, cartItems, total } = location.state || {};

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const normalizePhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.startsWith("0")) {
      return "254" + numbers.slice(1);
    }
    if (numbers.startsWith("7") && numbers.length <= 9) {
      return "254" + numbers;
    }
    return numbers;
  };

  // Handle both single product (Buy Now) and Cart
  let items = cartItems || [];
  let paymentTotal = total || 0;

  if (product && !cartItems) {
    items = [product];
    paymentTotal = Math.round(product.price * 130); // Convert DummyJSON price to KES
  }

  if (items.length === 0) {
    return <div className="text-center p-5">No products selected for payment.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length < 10) {
      setError("Please enter a valid phone number (e.g. 254712345678)");
      return;
    }

    setLoading(true);
    setMessage("Please wait as we process the transaction...");
    setError("");

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("amount", paymentTotal);

      const response = await axios.post(
        "https://peterson.alwaysdata.net/api/mpesa_payment",
        formData
      );

      setMessage(response.data.message || "Payment request sent. Complete it on your phone 📱");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Payment failed. Please try again.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='payment-page row justify-content-center mb-4'>
      <div className='col-md-6 payment-card card shadow m-4 p-4'>

        <h1 className="text-center mb-4">Lipa Na Mpesa</h1>

        {/* Product Items */}
        {items.map((item, index) => (
          <div key={index} className="mb-4 payment-item">
            <img
              src={
                item.thumbnail || 
                item.images?.[0] || 
                "https://via.placeholder.com/280"
              }
              alt={item.title || item.product_name}
              className="payment-item-image"
            />
            <p className="mt-3 mb-1 fw-bold fs-5">
              {item.title || item.product_name}
            </p>
            <p className="text-warning fs-5">
              KSH {item.price ? (item.price * 130).toFixed(0) : item.product_cost}
            </p>
          </div>
        ))}

        {/* Total */}
        <h4 className="text-success text-end mt-3">
          Total: KSH {paymentTotal}
        </h4>

        {/* Status Messages */}
        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <label className="form-label mt-3">Phone Number</label>
          <input
            type="tel"
            placeholder="(example , 254712345678)"
            className="form-control payment-phone-input"
            value={phone}
            onChange={(e) => setPhone(normalizePhone(e.target.value))}
            required
          />
          <br />

          <button 
            className="btn pay-now-btn w-100" 
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>

        <button 
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate(-1)}
        >
          ← Cancel
        </button>

      </div>
    </div>
  );
};

export default MakePayment;