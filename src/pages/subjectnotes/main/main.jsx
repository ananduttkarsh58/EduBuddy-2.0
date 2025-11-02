import React from "react";
import styles from "./main.module.css";

const notes = [
  { title: "Large Language Models (LLMs)", time: "10 mins ago" },
  { title: "Edge intelligence and embedded machine learning", time: "1 hr ago" },
  { title: "Explainable and interpretable machine learning", time: "18 hr ago" },
  { title: "Deep learning for medical applications", time: "23 hr ago" },
  { title: "Federated learning and MLOps", time: "Yesterday" },
  { title: "Generative AI", time: "18 Oct 2025" },
  { title: "Model-based reinforcement learning", time: "21 Oct 2025" },
  { title: "Diffusion models for robotics", time: "1 Oct 2025" },
  { title: "Mechanistic interpretability in neural networks", time: "30 Oct 2025" },
];

const Main = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {/* <h2 className={styles.logo}>📘</h2> */}
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>Home</a>
          <a href="#" className={`${styles.navItem}`}>Message</a>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>Notes</a>
          <a href="#" className={styles.navItem}>Settings</a>
        </nav>
        <p className={styles.footer}>Help and Feedback</p>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>ML</span> Notes
        </h1>

        <div className={styles.notesList}>
          {notes.map((note, index) => (
            <div key={index} className={styles.noteCard}>
              <div className={styles.left}>
                <img
                  src="https://via.placeholder.com/35"
                  alt="Profile"
                  className={styles.avatar}
                />
                <p className={styles.noteTitle}>{note.title}</p>
              </div>
              <div className={styles.right}>
                <span className={styles.time}>{note.time}</span>
                <button className={styles.menuBtn}>⋮</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Main;
