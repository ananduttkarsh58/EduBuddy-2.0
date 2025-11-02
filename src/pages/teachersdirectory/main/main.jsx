import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.css';

const Main = () => {
  const navigate = useNavigate();
  
  const teachers = [
    { id: 1, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'female' },
    { id: 2, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'male' },
    { id: 3, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'female' },
    { id: 4, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'male' },
    { id: 5, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'female' },
    { id: 6, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'male' },
    { id: 7, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'female' },
    { id: 8, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'male' },
    { id: 9, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'female' },
    { id: 10, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'male' },
    { id: 11, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'female' },
    { id: 12, name: 'Teacher', email: 'loremipsum@kiit.ac.in', image: 'male' },
  ];

  const handleCardClick = () => {
    navigate('/ts');
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Teachers Directory</h1>
          <p className={styles.subtitle}>Find your teacher here</p>
        </div>
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input 
            type="text" 
            placeholder="Search your Teacher" 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.teachersGrid}>
        {teachers.map((teacher) => (
          <div 
            key={teacher.id} 
            className={styles.teacherCard}
            onClick={handleCardClick}
          >
            <img 
              src={`https://i.pravatar.cc/150?img=${teacher.image === 'female' ? '47' : '12'}`}
              alt={teacher.name}
              className={styles.teacherImage}
            />
            <div className={styles.teacherInfo}>
              <h3 className={styles.teacherName}>{teacher.name}</h3>
              <p className={styles.teacherEmail}>{teacher.email}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;