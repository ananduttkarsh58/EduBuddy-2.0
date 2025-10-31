import React from "react";
import styles from "./navbar.module.css";
import { Sun } from "lucide-react";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <img
          src="https://i.ibb.co/4wBybCZD/kiit-logo.jpg"
          alt="KIIT Logo"
          className={styles.logo}
        />
        <h1 className={styles.brand}>EduBuddy</h1>
      </div>

      <ul className={styles.navLinks}>
        <li><a href="#" className={styles.active}>Home</a></li>
        <li><a href="#">Materials</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Settings</a></li>
      </ul>

      {/* <div className={styles.actions}>
        <button className={styles.getStarted}>Get Started</button>
        <Sun size={18} className={styles.icon} />
      </div> */}
    </nav>
  );
};

export default Navbar;
