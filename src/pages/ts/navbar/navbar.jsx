// import React from "react";
// import styles from "./navbar.module.css";

// const Navbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.container}>
//         {/* Logo Section */}
//         <a href="/" className={styles.logoLink}>
//           <div className={styles.logo}>
//             <img 
//               src="https://i.ibb.co/4wBybCZD/kiit-logo.jpg" 
//               alt="EduAssist Logo" 
//               className={styles.logoImage}
//             />
//             <span className={styles.logoText}>EduAssist</span>
//           </div>
//         </a>

//         {/* Navigation Links */}
//         <div className={styles.navLinks}>
//           <a href="/" className={styles.navLink}>Home</a>
//           <a href="/courses" className={styles.navLink}>Courses</a>
//           <a href="/resources" className={styles.navLink}>Resources</a>
//           <a href="/help" className={styles.navLink}>Help</a>
//         </div>

//         {/* Profile Picture */}
//         <div className={styles.profile}>
//           <img 
//             src="https://via.placeholder.com/40" 
//             alt="User Profile" 
//             className={styles.profileImage}
//           />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <img 
              src="https://i.ibb.co/4wBybCZD/kiit-logo.jpg" 
              alt="EduBuddy Logo" 
              className={styles.logoImage}
            />
            <span className={styles.logoText}>EduBuddy</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/courses" className={styles.navLink}>Material</Link>
          <Link to="/resources" className={styles.navLink}>About Us</Link>
          <Link to="/help" className={styles.navLink}>Settings</Link>
        </div>

        {/* Profile Picture */}
        <div className={styles.profile}>
          <img 
            src="https://via.placeholder.com/40" 
            alt="User Profile" 
            className={styles.profileImage}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;