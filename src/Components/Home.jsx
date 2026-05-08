import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import heroImage from './images/Vibecloset.png';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [heroOpacity, setHeroOpacity] = useState(1);
  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const productsRes = await axios.get('https://dummyjson.com/products?limit=0');
      setAllProducts(productsRes.data.products);

      const categoriesRes = await axios.get('https://dummyjson.com/products/categories');
      setCategories(categoriesRes.data);

      // Show only clothing by default
      const clothingCategories = ["mens-shirts", "womens-dresses", "womens-shoes", "mens-shoes", "womens-jewellery", "sunglasses"];
      
      const initialProducts = productsRes.data.products.filter(p => 
        clothingCategories.includes(p.category)
      );
      
      setFilteredProducts(initialProducts);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (category, search = searchTerm) => {
    setActiveCategory(category);
    let result = [...allProducts];

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description?.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(activeCategory, term);
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ Product added to cart!');
  };

  // Buy Now - Navigate with product data
  const handleBuyNow = (product) => {
    navigate("/makepayment", { 
      state: { product } 
    });
  };

  // Hero Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 400);
      setHeroOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  const heroStyle = {
    opacity: heroOpacity,
    transition: 'opacity 0.2s',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <div className="hero-left">
            <h1>VIBE<br />CLOSET</h1>
            <p>Wear Your Energy</p>
          </div>
          <button className="shop-now-btn" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
            Shop Now
          </button>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <div className="container" id="products-section">
        <h2 className="section-title">Our Collection ({filteredProducts.length} items)</h2>

        {/* Search & Filters ... (same as before) */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ padding: '12px 20px', width: '80%', maxWidth: '500px', borderRadius: '30px', border: '1px solid #ddd' }}
          />
        </div>

        <div className="category-filters">
          {/* ... your category buttons (unchanged) */}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                className="product-img"
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                loading="lazy"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
              />

              <div className="product-body">
                <h5>{product.title}</h5>
                <p className="price">KSH {(product.price * 130).toFixed(0)}</p>

                <div className="btn-group">
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                  <button 
                    className="buy-btn"
                    onClick={() => handleBuyNow(product)}   // ← Clean function
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