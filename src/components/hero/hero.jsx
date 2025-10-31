import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./hero.module.css";
import { MessageCircle } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const handleTSClick = () => {
    navigate("/ts");
  };

  const handleChtbotClick = () => {
    navigate("/chatbot");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.green}>KIIT EduBuddy</span> Is The Ultimate
          <br /> Learning Assistant
        </h1>
        <p className={styles.subtitle}>
          EduBuddy is an innovative platform designed to streamline and simplify your
          learning journey through a certified, all-in-one AI Agent.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primary} onClick={handleChtbotClick}>
            <MessageCircle size={18} />
            <span>Start Chatting</span>
          </button>
          <button className={styles.secondary} onClick={handleTSClick}>
            TS Interaction
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;