import React, { useState } from "react";
import styles from "./main.module.css";
import { Search, Paperclip, Mic, Send } from "lucide-react";

const Main = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! How can I assist you today?",
    },
    {
      id: 2,
      sender: "user",
      text: "Can you help me find resources for my history class?",
    },
    {
      id: 3,
      sender: "bot",
      text: "Of course! What specific topics are you studying in your history class?",
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: inputMessage,
        },
      ]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.main}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to EduBuddy</h1>
        <p className={styles.subtitle}>
          Ask me anything about your courses, assignments, or school resources. I'm here to help!
        </p>


      </div>

      {/* Chat Messages */}
      <div className={styles.chatContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.sender === "bot"
                ? styles.botMessageWrapper
                : styles.userMessageWrapper
            }
          >
            {message.sender === "bot" && (
              <>
                <div className={styles.avatarLabel}>Teacher</div>
                <div className={styles.messageRow}>
                  <div className={styles.botAvatar}>
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Bot Avatar"
                      className={styles.avatarImage}
                    />
                  </div>
                  <div className={styles.botMessage}>{message.text}</div>
                </div>
              </>
            )}

            {message.sender === "user" && (
              <>
                <div className={styles.userLabel}>Student</div>
                <div className={styles.messageRow}>
                  <div className={styles.userMessage}>{message.text}</div>
                  <div className={styles.userAvatar}>
                    <img
                      src="https://via.placeholder.com/40"
                      alt="User Avatar"
                      className={styles.avatarImage}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className={styles.inputSection}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            className={styles.messageInput}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className={styles.inputActions}>
            <button className={styles.iconButton}>
              <Paperclip size={20} />
            </button>
            <button className={styles.iconButton}>
              <Mic size={20} />
            </button>
            <button className={styles.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;