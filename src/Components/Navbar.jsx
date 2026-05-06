// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userStatus === "true");
  }, []);

  return (
    <nav className="navbar">
      <h2>Vibe Closet</h2>
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
{/* Overlay */}
{menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

{/* Links */}
<div className={`nav-links ${menuOpen ? "active" : ""}`}></div>
      {/* Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="btn"  onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/learn" className="btn"  onClick={() => setMenuOpen(false)}>LEARN MORE</Link>
        <Link to="/cart" className="btn" onClick={() => setMenuOpen(false)}>CART</Link>

        {/* 👇 Only show if logged in */}
        {isLoggedIn && (
          <Link to="/addcloset" className="btn" onClick={() => setMenuOpen(false)}>ADD TO CLOSET</Link>
        )}

        <Link to="/signin" className="btn" onClick={() => setMenuOpen(false)}>SIGN IN</Link>
        {/* <Link to="/signup" className="btn" onClick={() => setMenuOpen(false)}>SIGN UP</Link> */}
      </div>
    </nav>
  );
}

export default Navbar; 