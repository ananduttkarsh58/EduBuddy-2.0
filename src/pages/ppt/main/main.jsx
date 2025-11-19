// import React, { useState } from 'react';
// import styles from './main.module.css';

// const Main = () => {
//   const [formData, setFormData] = useState({
//     branch: '',
//     subjectName: '',
//     chapterName: '',
//     importantTopics: '',
//     numberOfSlides: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Add your presentation generation logic here
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>Generate a new Presentation</h1>
//         <p className={styles.subtitle}>Fill in the details below to generate a custom ppt</p>
//       </div>

//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label className={styles.label}>Branch</label>
//           <input
//             type="text"
//             name="branch"
//             value={formData.branch}
//             onChange={handleChange}
//             placeholder="eg:- CSE, IT, ECE"
//             className={styles.input}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label className={styles.label}>Subject Name</label>
//           <input
//             type="text"
//             name="subjectName"
//             value={formData.subjectName}
//             onChange={handleChange}
//             placeholder="eg:- Operating System"
//             className={styles.input}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label className={styles.label}>Chapter Name</label>
//           <input
//             type="text"
//             name="chapterName"
//             value={formData.chapterName}
//             onChange={handleChange}
//             placeholder="eg:- Process Scheduling, IT, ECE"
//             className={styles.input}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label className={styles.label}>Important Topics</label>
//           <textarea
//             name="importantTopics"
//             value={formData.importantTopics}
//             onChange={handleChange}
//             placeholder="Enter comma-separated topics, eg, Routing Algorithm, Network Layer"
//             className={styles.textarea}
//             rows="4"
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label className={styles.label}>Number of Slides</label>
//           <input
//             type="text"
//             name="numberOfSlides"
//             value={formData.numberOfSlides}
//             onChange={handleChange}
//             placeholder="eg:- 10"
//             className={styles.input}
//           />
//         </div>

//         <button type="submit" className={styles.submitButton}>
//           <svg 
//             width="20" 
//             height="20" 
//             viewBox="0 0 24 24" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="2"
//             className={styles.buttonIcon}
//           >
//             <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
//           </svg>
//           Generate Presentation
//         </button>
//       </form>
//     </main>
//   );
// };

// export default Main;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.css';

const Main = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch: '',
    subjectName: '',
    chapterName: '',
    importantTopics: '',
    numberOfSlides: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your presentation generation logic here
  };

  return (
    <main className={styles.main}>
      {/* Chatbot Button
      <button
        className={`${styles.submitButton} ${styles.chatbotButton}`}
        onClick={() => navigate('/chatbot')}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className={styles.buttonIcon}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Chatbot
      </button> */}

      <div className={styles.header}>
        <h1 className={styles.title}>Generate a new Presentation</h1>
        <p className={styles.subtitle}>Fill in the details below to generate a custom ppt</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="eg:- CSE, IT, ECE"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Subject Name</label>
          <input
            type="text"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            placeholder="eg:- Operating System"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Chapter Name</label>
          <input
            type="text"
            name="chapterName"
            value={formData.chapterName}
            onChange={handleChange}
            placeholder="eg:- Process Scheduling"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Important Topics</label>
          <textarea
            name="importantTopics"
            value={formData.importantTopics}
            onChange={handleChange}
            placeholder="Enter comma-separated topics, eg, Routing Algorithm, Network Layer"
            className={styles.textarea}
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Number of Slides</label>
          <input
            type="text"
            name="numberOfSlides"
            value={formData.numberOfSlides}
            onChange={handleChange}
            placeholder="eg:- 10"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={styles.buttonIcon}
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Generate Presentation
        </button>
      </form>
    </main>
  );
};

export default Main;
