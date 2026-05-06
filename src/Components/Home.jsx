import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  
  // Hero visibility state
  const [heroOpacity, setHeroOpacity] = useState(1);

  const img_url = "https://peterson.alwaysdata.net/static/images/";
  const navigate = useNavigate();

  // Fetch products
  const home = async () => {
    setLoading("Please wait as we process your request");
    try {
      const response = await axios.get("https://peterson.alwaysdata.net/api/get_product_details");
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Add to cart
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  // Scroll handler for hero fade out
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade out hero completely after scrolling 400px (adjust as needed)
      const opacity = Math.max(0, 1 - scrollY / 400);
      setHeroOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    home();
  }, []);

  if (loading) return <div>{loading}</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* ==================== HERO SECTION ==================== */}
      <section 
        className="hero-section"
        style={{ 
          opacity: heroOpacity,
          transition: 'opacity 0.2s ease-out',
          pointerEvents: heroOpacity === 0 ? 'none' : 'auto'
        }}
      >
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              VIBE<br /> CLOSET
            </h1>
            <p>Wear Your Energy</p>
          </div>
          
          {/* Optional: Add a call-to-action button */}
          <div className="hero-cta">
            <button 
              className="shop-now-btn"
              onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCTS SECTION ==================== */}
      <div className="container" id="products-section">
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.product_id}>
              <img
                className="product-img"
                src={img_url + product.product_photo}
                alt={product.product_name}
              />

              <div className="product-body">
                <h5>{product.product_name}</h5>
                <p className="price">$ {product.product_cost}</p>

                <div className="btn-group">
                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>

                  <button
                    className="buy-btn"
                    onClick={() =>
                      navigate("/makepayment", { state: { product } })
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;