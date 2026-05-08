import { HashRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import LearnMore from "./Components/LearnMore";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Cart from "./Components/Cart";
import MpesaPayment from "./Components/MakePayments";
import Navbar from "./Components/Navbar";
/* ================= NAVBAR ================= */
// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2>Vibe Closet
//       </h2>
//       <div className="logo">
//         <div className="logo-box"></div>
//       </div>

//       <div className="nav-links">
<Link to="/navbar" className="btn">NAVBAR</Link>
//         <Link to="/" className="btn">HOME</Link>
//         <Link to="/learn" className="btn">LEARN MORE</Link>
//         <Link to="/cart" className="btn">CART</Link>
//         <Link to="/addcloset" className="btn">ADD TO CLOSET</Link>
//         <Link to="/signin" className="btn">SIGN IN</Link>
//         <Link to="/signup" className="btn">SIGN UP</Link>
//       </div>
//     </nav>
//   );
// }

/* 

/* ================= MAIN APP ================= */
function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/learn" element={<LearnMore />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/makepayment" element={<MpesaPayment />} />
      </Routes>
    </HashRouter>
  );
}

export default App;