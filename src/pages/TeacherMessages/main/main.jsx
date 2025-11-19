import React, { useState } from 'react';
import styles from './main.module.css';
import { useNavigate } from "react-router-dom"; 


const Main = () => {
  const [filter, setFilter] = useState('Recent');
  const navigate = useNavigate();

  const students = [
    { id: 1, studentId: '22051178', avatar: 'https://i.pravatar.cc/150?img=1', time: '10 mins ago' },
    { id: 2, studentId: '22051578', avatar: 'https://i.pravatar.cc/150?img=33', time: '1 hr ago' },
    { id: 3, studentId: '22051567', avatar: 'https://i.pravatar.cc/150?img=2', time: '18 hr ago' },
    { id: 4, studentId: '22051523', avatar: 'https://i.pravatar.cc/150?img=34', time: '23 hr ago' },
    { id: 5, studentId: '22051569', avatar: 'https://i.pravatar.cc/150?img=3', time: 'Yesterday' },
    { id: 6, studentId: '22051519', avatar: 'https://i.pravatar.cc/150?img=35', time: '18 Oct 2025' },
    { id: 7, studentId: '22051508', avatar: 'https://i.pravatar.cc/150?img=4', time: '21 Oct 2025' },
    { id: 8, studentId: '22051278', avatar: 'https://i.pravatar.cc/150?img=36', time: '1 Oct 2025' },
    { id: 9, studentId: '22051978', avatar: 'https://i.pravatar.cc/150?img=5', time: '30 Oct 2025' },
  ];

  const handleStudentClick = () => {
    navigate(`/teachermessagepage`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Students</h1>
          <p className={styles.subtitle}>looking for your guidance</p>
        </div>
        {/* <img 
          src="https://i.imgur.com/6QKI8Zu.png" 
          alt="Students illustration" 
          className={styles.illustration}
        /> */}
      </div>

      <div className={styles.filterContainer}>
        <button className={styles.filterButton}>
          {filter}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div className={styles.studentsList}>
        {students.map((student) => (
          <div 
            key={student.id} 
            className={styles.studentCard}
            onClick={handleStudentClick}
          >
            <div className={styles.studentInfo}>
              <img 
                src={student.avatar} 
                alt={student.studentId}
                className={styles.avatar}
              />
              <span className={styles.studentId}>{student.studentId}</span>
            </div>
            <div className={styles.rightSection}>
              <span className={styles.time}>{student.time}</span>
              <button className={styles.menuButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;