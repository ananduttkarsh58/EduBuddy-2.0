import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dummy user (replace with real auth later)
  const user = {
    name: "Anand",
    avatar: "/user-avatar.png", // image in public folder
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    alert("Logged out successfully!");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className={styles.navbar}>
      {/* Left: Logo Section */}
      <div className={styles.logoSection}>
        <img
          src="https://i.ibb.co/4wBybCZD/kiit-logo.jpg"
          alt="KIIT Logo"
          className={styles.logo}
        />
        <Link to="/" className={styles.brand}>
          EduBuddy
        </Link>
      </div>

      {/* Center: Nav Links */}
      <ul className={styles.navLinks}>
        {!isHomePage && (
          <li>
            <Link to="/" className={styles.active}>
              Home
            </Link>
          </li>
        )}
        <li>
          <Link to="/notes">Materials</Link>
        </li>

        {/* ✅ Static HTML page in /public/about.html */}
        <li>
          <a href="/about.html">About us</a>
        </li>

        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>

      {/* Right: Profile Section */}
      <div className={styles.profileSection} ref={dropdownRef}>
        <img
          src={user.avatar}
          alt="User Profile"
          className={styles.profileImage}
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className={styles.dropdownMenu}>
            <p className={styles.userName}>{user.name}</p>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
