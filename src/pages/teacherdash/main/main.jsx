import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.css';

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/notes');
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.logoSection}>
            <img
              src="https://i.ibb.co/4wBybCZD/kiit-logo.jpg"
              alt="KIIT Logo"
              className={styles.logo}
            />
            <h2 className={styles.university}>KIIT University</h2>
          </div>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={`${styles.navItem} ${styles.active}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </a>

          {/* <a href="#" className={styles.navItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Courses</span>
          </a> */}

          <a href="/messages" className={styles.navItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
            <span>Messages</span>
          </a>

          <a href="/notes" className={styles.navItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>Notes</span>
          </a>

          <a href="#" className={styles.navItem}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M21 12h-6m-6 0H3" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>

        <div className={styles.footer}>
          <button className={styles.newButton}>New</button>

          <a href="#" className={styles.helpLink}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Help and Feedback</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, Professor User</h1>

        {/* Quick Actions */}
        <section className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <button className={styles.primaryButton} onClick={handleClick}>Upload Notes</button>
            {/* <button className={styles.secondaryButton}>Manage Courses</button> */}

            <button
              className={styles.secondaryButton}
              onClick={() => navigate('/ppt')}
            >
              Generate PPT
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate('/chatbot')}
            >
              Chatbot
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className={styles.recentActivity}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>

          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className={styles.activityContent}>
                <h3 className={styles.activityTitle}>Notes Uploaded</h3>
                <p className={styles.activityDescription}>
                  Uploaded notes for Calculus 101
                </p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <div className={styles.activityContent}>
                <h3 className={styles.activityTitle}>New Message</h3>
                <p className={styles.activityDescription}>
                  New message from student in Physics 202
                </p>
              </div>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className={styles.activityContent}>
                <h3 className={styles.activityTitle}>Course Updated</h3>
                <p className={styles.activityDescription}>
                  Updated course materials for Chemistry 301
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
