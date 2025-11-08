import React from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./main.module.css";

const subjects = ["ML", "AI", "DMDW", "DSA", "ML", "AI", "DMDW", "DSA"];

const Main = () => {
  const navigate = useNavigate();

  const handleFolderClick = () => {
    navigate("/subjectnotes");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <a href="/" className={styles.navItem}>Home</a>
          <a href="/messages" className={styles.navItem}>Message</a>
          <a href="/notes" className={`${styles.navItem} ${styles.active}`}>Notes</a>
          <a href="/settings" className={styles.navItem}>Settings</a>
        </nav>
        <p className={styles.footer}>Help and Feedback</p>
      </aside>

      {/* Main Section */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Subjects</h1>
          <button className={styles.addBtn}>+ Add Subject</button>
        </div>

        <div className={styles.folderGrid}>
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={styles.folder}
              onClick={handleFolderClick}
            >
              {subject}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Main;
