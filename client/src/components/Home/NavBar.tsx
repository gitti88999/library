// components/NavBar.tsx
import React from "react";

const NavBar: React.FC = () => (
  <nav style={{ display: "flex", justifyContent: "center", backgroundColor: "#333" }}>
    <a href="#" style={navLinkStyle}>בית</a>
    <a href="#" style={navLinkStyle}>ספרים</a>
    <a href="#" style={navLinkStyle}>השאלות שלי</a>
    <a href="#" style={navLinkStyle}>צור קשר</a>
  </nav>
);

const navLinkStyle: React.CSSProperties = {
  color: "white",
  padding: "14px 20px",
  textDecoration: "none",
};

export default NavBar;