import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={styles.navbar}>
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

      <ul className={styles.navLinks}>
        {/* Show Home only if not on dashboard */}
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
        <li>
          <Link to="/teachersdirectory">About us</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
