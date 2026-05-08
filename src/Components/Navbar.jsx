// // import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ShoppingCart } from 'lucide-react';
// import { House } from 'lucide-react';
// import { User } from 'lucide-react';
// import { BookOpenText } from 'lucide-react';
// import { CircleDollarSign } from 'lucide-react';

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // const app = () =>{ return(<ShoppingCart/>);
// //         };
//   useEffect(() => {
//     const userStatus = localStorage.getItem("isLoggedIn");
//     setIsLoggedIn(userStatus === "true");
//   }, []);

//   return (
//     <nav className="navbar">
//       <h2>Vibe Closet</h2>
//       {/* Hamburger Icon */}
//       <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         ☰
//       </div>
// {/* Overlay */}
// {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

// {/* Links */}
// <div className={`nav-links ${menuOpen ? "active" : ""}`}></div>
//       {/* Links */}
//       <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <Link to="/" className="btn"  onClick={() => setMenuOpen(false)}>HOME<br/><House/></Link>
//         <Link to="/learn" className="btn"  onClick={() => setMenuOpen(false)}>LEARN MORE <br/><BookOpenText/></Link>
        
         
//                <Link to="/cart" className="btn" onClick={() => setMenuOpen(false)}>CART <br/><ShoppingCart/></Link>

//         {/* 👇 Only show if logged in */}
//         {/signin && /signup == true (
//           <Link to="/addcloset" className="btn" onClick={() => setMenuOpen(false)}>ADD TO CLOSET <br /><CircleDollarSign /><br/></Link>
//         )}

//         <Link to="/signin" className="btn" onClick={() => setMenuOpen(false)}>SIGN IN<br/><User/></Link>
//         <Link to="/signup" className="btn" onClick={() => setMenuOpen(false)}>SIGN Up<br/><User/></Link>
//         {/* <Link to="/signup" className="btn" onClick={() => setMenuOpen(false)}>SIGN UP</Link> */}
//       </div>

//     </nav>
    
//   );
// }

// export default Navbar; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, House, User, BookOpenText, LogOut } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userStatus === "true");
  }, [location]);

  // Logout Function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setMenuOpen(false);
      navigate("/"); // Redirect to home after logout
    }
  };

  return (
    <nav className="navbar">
    <h1>Vibe Closet</h1>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="btn" onClick={() => setMenuOpen(false)}>
          HOME <br />
          <House />
        </Link>

        <Link to="/learn" className="btn" onClick={() => setMenuOpen(false)}>
          LEARN MORE <br />
          <BookOpenText />
        </Link>

        <Link to="/cart" className="btn" onClick={() => setMenuOpen(false)}>
          CART <br />
          <ShoppingCart />
        </Link>

        {/* Show only when logged in */}
        {isLoggedIn && (
          <>
            {/* Logout Button */}
            <button 
              className="btn logout-btn" 
              onClick={handleLogout}
            >
              LOGOUT <br />
              <LogOut />
            </button>
          </>
        )}

        {/* Show only when NOT logged in */}
        {!isLoggedIn && (
          <>
            <Link to="/signin" className="btn" onClick={() => setMenuOpen(false)}>
              SIGN IN <br />
              <User />
            </Link>

            <Link to="/signup" className="btn" onClick={() => setMenuOpen(false)}>
              SIGN UP <br />
              <User />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;