import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 30px",
        backgroundColor: "#4CAF50",
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Home</Link>
      <Link to="/about" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>About</Link>
      <Link to="/services" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Services</Link>
      <Link to="/contact" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
