// src/components/TeacherNavbar/Tnavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./Tnavbar.module.css";

const TeacherNavbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/auth";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // read role from storage (normalize to lowercase)
  const rawRole =
    (localStorage.getItem("userRole") || sessionStorage.getItem("userRole") || "")
      .toString()
      .toLowerCase();
  // fallback: if this navbar is only for teachers keep teacher as default
  const role = rawRole || "teacher";

  // compute role-aware routes
  const routes = {
    home: role === "teacher" ? "/teacherdashboard" : "/home",
    materials: role === "teacher" ? "/teachernotes" : "/subjectnotes",
    chatbot: role === "teacher" ? "/teacherchatbot" : "/chatbot",
    messages: role === "teacher" ? "/teachermessages" : "/messages",
  };

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
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("authToken");
    // navigate to auth/login root
    window.location.href = "/auth";
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
        <Link to={routes.home} className={styles.brand}>
          EduBuddy
        </Link>
      </div>

      {/* Center: Nav Links */}
      <ul className={styles.navLinks}>
        {!isHomePage && (
          <li>
            <NavLink
              to={routes.home}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Home
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to={routes.materials}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Materials
          </NavLink>
        </li>
{/* 
        <li>
          <NavLink
            to={routes.messages}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Messages
          </NavLink>
        </li>

        <li>
          <NavLink
            to={routes.chatbot}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Chatbot
          </NavLink>
        </li> */}

        {/* Static HTML page in /public/about.html */}
        <li>
          <a className={styles.link} href="/about.html">
            About us
          </a>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>

      {/* Right: Profile Section */}
      <div className={styles.profileSection} ref={dropdownRef}>
        <img
          src={user.avatar}
          alt="User Profile"
          className={styles.profileImage}
          onClick={() => setIsOpen((s) => !s)}
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

export default TeacherNavbar;
