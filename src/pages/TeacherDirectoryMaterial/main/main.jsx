import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.css';

const Main = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 👇 Teacher Data (edit or expand as needed)
  const teachers = [
    { id: 1, name: 'Rohit Kumar', email: 'rohitkumar@kiit.ac.in', gender: 'male' },
    { id: 2, name: 'Sneha Patnaik', email: 'snehapatnaik@kiit.ac.in', gender: 'female' },
    { id: 3, name: 'Ankit Sharma', email: 'ankitsharma@kiit.ac.in', gender: 'male' },
    { id: 4, name: 'Priya Das', email: 'priyadas@kiit.ac.in', gender: 'female' },
    { id: 5, name: 'Rakesh Sen', email: 'rakeshsen@kiit.ac.in', gender: 'male' },
  ];

  // 🔍 Search Logic
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate on card click
  const handleCardClick = () => {
    navigate('/notes');
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Teachers Directory</h1>
          <p className={styles.subtitle}>Find your teacher here</p>
        </div>

        {/* 🔍 Search Input */}
        <div className={styles.searchContainer}>
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search your Teacher"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🧑‍🏫 Teachers List */}
      <div className={styles.teachersGrid}>
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className={styles.teacherCard}
              onClick={handleCardClick}
            >
              <img
                src={
                  teacher.gender === 'female'
                    ? '/female-icon.png'
                    : teacher.gender === 'male'
                    ? '/male-icon.png'
                    : '/neutral-avatar.png' // fallback (optional)
                }
                alt={teacher.name}
                className={styles.teacherImage}
              />
              <div className={styles.teacherInfo}>
                <h3 className={styles.teacherName}>{teacher.name}</h3>
                <p className={styles.teacherEmail}>{teacher.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#fff', marginTop: '2rem' }}>No teacher found.</p>
        )}
      </div>
    </main>
  );
};

export default Main;
