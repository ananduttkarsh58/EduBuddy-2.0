import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./main.module.css";

const Main = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState(["ML", "AI", "DMDW", "DSA", "EECS", "Automata", "DOS", "Software Engg"]);
  const [showModal, setShowModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");

  const handleFolderClick = (subject) => {
    navigate("/studentsubjectnotes", { state: { subject } });
  };

  const handleAddSubject = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewSubjectName("");
  };

  const handleCreateSubject = () => {
    if (newSubjectName.trim()) {
      setSubjects([...subjects, newSubjectName.trim().toUpperCase()]);
      handleModalClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateSubject();
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <a href="/" className={styles.navItem}>Home</a>
          <a href="/messages" className={styles.navItem}>Message</a>
          <a href="/notes" className={`${styles.navItem} ${styles.active}`}>Notes</a>
          <a href="/settings" className={styles.navItem}>Settings</a>
        </nav>
        <p className={styles.footer}>Help and Feedback</p>
      </aside> */}

      {/* Main Section */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Subjects</h1>
          {/* <button className={styles.addBtn} onClick={handleAddSubject}>
            + Add Subject
          </button> */}
        </div>

        <div className={styles.folderGrid}>
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={styles.folder}
              onClick={() => handleFolderClick(subject)}
            >
              {subject}
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleModalClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add New Subject</h2>
            <input
              type="text"
              className={styles.modalInput}
              placeholder="Enter subject name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <div className={styles.modalButtons}>
              <button className={styles.modalBtnCancel} onClick={handleModalClose}>
                Cancel
              </button>
              <button className={styles.modalBtnOk} onClick={handleCreateSubject}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;