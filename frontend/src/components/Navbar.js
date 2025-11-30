import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "News", path: "/news" },
    { name: "Result", path: "/results" },
  ];

  const handleDownload = () => {
    alert("Brochure Download initiated! (Placeholder)");
  };

  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="nav-container" style={styles.container}>
        {}
        <Link to="/" className="nav-logo" style={styles.logo}>
          FEST APP
        </Link>

        {}
        <div
          className="menu-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={styles.menuIcon}
        >
          {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>

        {}
        <ul
          className={`nav-menu ${isOpen ? "active" : ""}`}
          style={{ ...styles.menu, right: isOpen ? "0" : "-100%" }}
        >
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item" style={styles.item}>
              <Link
                to={link.path}
                className="nav-link"
                onClick={() => setIsOpen(false)}
                style={styles.link}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {}
          <li className="nav-item" style={styles.item}>
            <button onClick={handleDownload} style={styles.button}>
              <FaDownload style={{ marginRight: "8px" }} /> Brochure Download
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "80px",
    zIndex: 1,
    width: "100%",
    maxWidth: "1300px",
    padding: "0 24px",
  },
  logo: {
    color: "#fff",
    justifySelf: "flex-start",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "2rem",
    display: "flex",
    alignItems: "center",
  },
  menuIcon: {
    display: "none",
    color: "#fff",
    cursor: "pointer",
    "@media (max-width: 960px)": {
      display: "block",
      position: "absolute",
      top: "0",
      right: "20px",
      transform: "translate(-100%, 60%)",
    },
  },
  menu: {
    display: "flex",
    listStyle: "none",
    textAlign: "center",
    marginRight: "-22px",
    "@media (max-width: 960px)": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "90vh",
      position: "absolute",
      top: "80px",
      left: (isOpen) => (isOpen ? "0" : "-100%"),
      opacity: 1,
      transition: "all 0.5s ease",
      backgroundColor: "#333",
    },
  },
  item: {
    height: "80px",
    "@media (max-width: 960px)": {
      width: "100%",
    },
  },
  link: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "0 1rem",
    height: "100%",
    "@media (max-width: 960px)": {
      textAlign: "center",
      padding: "2rem",
      width: "100%",
      display: "table",
    },
  },
  button: {
    backgroundColor: "#ff9900",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    marginTop: "20px",
  },
};

export default Navbar;
