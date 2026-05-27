// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => (
  <footer style={footerStyle}>
    &copy; 2026 ספרייה שיתופית
  </footer>
);

const footerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
  padding: "10px 0",
  marginTop: "auto", // דוחף את ה-footer לתחתית
};

export default Footer;