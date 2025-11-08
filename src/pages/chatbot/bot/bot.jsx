import React, { useState, useEffect, useRef } from "react";
import styles from "./bot.module.css";
import {
  Search,
  Mic,
  Paperclip,
  Plus,
  Download,
  Copy,
  Star,
  MoreVertical,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";

const Bot = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hi there! How can I assist you today?", type: "text" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState([]); // <-- NEW tray
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [modalCopied, setModalCopied] = useState(false);

  // Voice + file
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const menuRef = useRef(null);
  const editInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Favorites stored in localStorage with migration
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((fav, index) => {
        if (!fav.name || !fav.messageId) {
          return {
            id: fav.id || Date.now() + index,
            messageId: fav.id || Date.now() + index,
            name: fav.name || `Chat ${index + 1}`,
            text: fav.text || "",
            timestamp: fav.timestamp || new Date().toISOString(),
          };
        }
        return fav;
      });
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Smart response system (trimmed where possible)
  const getSmartResponse = (userMessage) => {
    const message = (userMessage || "").toLowerCase().trim();

    if (/(^|\s)(hi|hello|hey|good morning|good afternoon|good evening)(\s|$|!|,)/i.test(message)) {
      return "Hello! I'm EduBuddy, your educational assistant. How can I help you with your studies today?";
    }
    if (/(^|\s)(hey there|what's up|whats up|wassup|sup|yo|howdy|g'day|alright)(\s|$|!|,|\?)/i.test(message)) {
      return "Hey! Great to see you here! I'm EduBuddy, ready to help with coursework or questions. What are you working on today?";
    }
    if (/(sup bro|hey bro|yo bro|sup mate|hey mate)/i.test(message)) {
      return "Hey! I'm your study buddy. Which subject are we tackling?";
    }
    if (/(how are you|how're you|how r u|how have you been|how've you been)/i.test(message)) {
      return "I'm doing great. What do you want to work on right now?";
    }
    if (/(what can you|what do you|how can you help|what are you|who are you|capabilities)/i.test(message)) {
      return "I can explain concepts, summarize notes, create MCQs/flashcards, plan study schedules, and walk you through problems.";
    }
    if (/(study tips|how to study|study better|improve studying|study techniques)/i.test(message)) {
      return "Solid study plan: consistent schedule, Pomodoro 25–30, active recall, spaced practice, tidy notes, minimize distractions.";
    }
    if (/(help.*homework|help.*assignment|do my homework|solve.*problem)/i.test(message)) {
      return "Share the exact question, topic, and what you tried. I’ll guide you—no spoon-feeding.";
    }
    if (/(exam|test|quiz|preparation|prepare for)/i.test(message)) {
      return "Review summaries, target weak spots, drill past papers, start early, and sleep well. Tell me the subject for specifics.";
    }
    if (/(thank you|thanks|appreciate|helpful)/i.test(message)) {
      return "You're welcome. What’s next?";
    }
    if (/(solve|calculate|what is|compute|[+*/-]|\d+.*\d+)/i.test(message) && /\d/.test(message)) {
      return "Paste the exact problem; I’ll show the steps.";
    }
    if (/(history|historical|ancient|war|civilization)/i.test(message)) {
      return "Give me the period/event; I’ll break it down.";
    }
    if (/(science|physics|chemistry|biology|experiment)/i.test(message)) {
      return "Topic + confusion point = clear explanation.";
    }
    if (/(convert.*bullet|turn.*bullet|make.*bullet|bullet points)/i.test(message)) {
      return "Paste the text; I’ll bullet it.";
    }
    if (/(rewrite.*simpl|simpler words|simplify|make.*easier|dumb.*down|easy.*understand)/i.test(message)) {
      return "Drop the text; I’ll simplify it without losing meaning.";
    }
    if (/(flashcard|flash card|make.*cards|create.*cards)/i.test(message)) {
      return "Topic + notes ⇒ Q/A flashcards.";
    }
    if (/(summary|summarize|summarise|brief|tldr|tl;dr|condense|short version)/i.test(message)) {
      return "Share the content and target length; I’ll summarize.";
    }
    if (/(short answer|brief answer|quick answer|concise answer)/i.test(message)) {
      return "Send the question; I’ll craft a concise model answer.";
    }
    if (/(mcq|multiple choice|generate.*question|create.*question|quiz question)/i.test(message)) {
      return "Topic + difficulty + count; I’ll generate MCQs with answers.";
    }
    if (/(true.*false|true or false|t\/f questions)/i.test(message)) {
      return "Topic please; I’ll generate T/F items.";
    }
    if (/(explain like.*5|eli5|explain.*simple|like.*child|for.*kid)/i.test(message)) {
      return "Tell me the concept; I’ll ELI5 it.";
    }
    return "Give me more context or the exact question and I’ll jump in.";
  };

  // Render helper for text with newlines preserved
  const renderText = (text = "") =>
    text.split("\n").map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  // ---- SEND (text + pending attachments together) ----
  const handleSendMessage = () => {
    const hasText = inputMessage.trim().length > 0;
    const hasFiles = pendingAttachments.length > 0;
    if (!hasText && !hasFiles) return;

    // bundle message
    const newMsg = {
      id: Date.now(),
      sender: "user",
      username: "User",
      type: "bundle",
      text: inputMessage,
      attachments: pendingAttachments, // [{ id, type:'image'|'file', ... }]
    };
    setMessages((prev) => [...prev, newMsg]);

    // bot reply (based on text)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        type: "text",
        text: getSmartResponse(inputMessage || "[file(s) attached]"),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);

    // reset input + tray
    setInputMessage("");
    setPendingAttachments([]);
    const ta = document.getElementById("edubuddy-textarea");
    if (ta) ta.style.height = "auto";
  };

  // Enter=send, Shift+Enter=newline
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Copy / Download helpers (bot text only)
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text || "");
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleModalCopy = (text) => {
    navigator.clipboard.writeText(text || "");
    setModalCopied(true);
    setTimeout(() => setModalCopied(false), 1500);
  };

  const handleDownload = (text, index) => {
    const blob = new Blob([text || ""], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bot_response_${index + 1}.txt`;
    link.click();
  };

  const handleModalDownload = (text, name) => {
    const blob = new Blob([text || ""], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${(name || "favorite").replace(/\s+/g, "_")}.txt`;
    link.click();
  };

  // Favorites (bot text)
  const handleToggleFavorite = (message) => {
    const existingFav = favorites.find((fav) => fav.messageId === message.id);
    if (existingFav) {
      setFavorites(favorites.filter((fav) => fav.messageId !== message.id));
    } else {
      const existingNumbers = new Set(
        favorites
          .map((fav) => {
            const m = fav.name?.match(/^Chat (\d+)$/);
            return m ? parseInt(m[1], 10) : null;
          })
          .filter((n) => n !== null)
      );
      let nextChatNumber = 1;
      while (existingNumbers.has(nextChatNumber)) nextChatNumber++;

      const newFavorite = {
        id: Date.now(),
        messageId: message.id,
        name: `Chat ${nextChatNumber}`,
        text: message.text || "",
        timestamp: new Date().toISOString(),
      };
      setFavorites((prev) => [newFavorite, ...prev]);
    }
  };

  const handleNewChat = () => {
    setMessages([
      { id: Date.now(), sender: "bot", text: "Hi there! How can I assist you today?", type: "text" },
    ]);
    setInputMessage("");
    setPendingAttachments([]);
    const ta = document.getElementById("edubuddy-textarea");
    if (ta) ta.style.height = "auto";
  };

  const isFavorite = (messageId) => favorites.some((fav) => fav.messageId === messageId);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
    setOpenMenuId(null);
  };

  const handleDownloadFavorite = (text, name) => {
    const blob = new Blob([text || ""], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${(name || "favorite").replace(/\s+/g, "_")}.txt`;
    link.click();
    setOpenMenuId(null);
  };

  const handleStartRename = (fav) => {
    setEditingId(fav.id);
    setEditingName(fav.name);
    setOpenMenuId(null);
  };

  const handleSaveRename = () => {
    if (editingName.trim()) {
      setFavorites(
        favorites.map((fav) =>
          fav.id === editingId ? { ...fav, name: editingName.trim() } : fav
        )
      );
    }
    setEditingId(null);
    setEditingName("");
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleRenameKeyPress = (e) => {
    if (e.key === "Enter") handleSaveRename();
    else if (e.key === "Escape") handleCancelRename();
  };

  const handleLoadFavoriteChat = (fav) => {
    if (editingId !== fav.id) {
      setSelectedFavorite(fav);
      setModalCopied(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedFavorite(null);
    setModalCopied(false);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const filteredFavorites = favorites.filter((fav) => {
    if (!fav || typeof fav !== "object") return false;
    const name = (fav.name || "").toLowerCase();
    const text = (fav.text || "").toLowerCase();
    const query = (searchQuery || "").toLowerCase();
    return name.includes(query) || text.includes(query);
  });

  // Auto-resize helper for textarea
  const handleTextareaChange = (e) => {
    setInputMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // ---- Files: queue to tray (do NOT send immediately) ----
  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const queued = files.map((file) => {
      const id = `${Date.now()}_${file.name}_${Math.random()}`;
      const href = URL.createObjectURL(file);
      const isImage = /^image\//.test(file.type);
      return isImage
        ? { id, type: "image", src: href, name: file.name, size: file.size }
        : { id, type: "file", href, name: file.name, size: file.size };
    });

    setPendingAttachments((prev) => [...prev, ...queued]);
    e.target.value = "";
  };

  const removePendingAttachment = (id) => {
    setPendingAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // ---- Voice: Web Speech API ----
  const toggleListen = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input isn't supported in this browser. Use Chrome.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event) => {
        let interim = "";
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalText += transcript;
          else interim += transcript;
        }
        const next = (inputMessage + " " + interim + finalText).trim();
        setInputMessage(next);

        const ta = document.getElementById("edubuddy-textarea");
        if (ta) {
          ta.style.height = "auto";
          ta.style.height = `${ta.scrollHeight}px`;
        }
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className={styles.container}>
      {/* ================= Sidebar ================= */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Chats</h2>

        <button className={styles.newChatButton} onClick={handleNewChat}>
          <Plus size={20} />
          New Chat
        </button>

        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search favorites"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <h3 className={styles.favoriteTitle}>Favorites</h3>

        <div className={styles.sidebarScrollable}>
          <div className={styles.favoriteSection}>
            <ul className={styles.favoriteList}>
              {filteredFavorites.length > 0 ? (
                filteredFavorites.map((fav) => (
                  <li
                    key={fav.id}
                    className={styles.favoriteItem}
                    onClick={() => handleLoadFavoriteChat(fav)}
                  >
                    <Star size={14} className={styles.favoriteIcon} />

                    {editingId === fav.id ? (
                      <div className={styles.editContainer}>
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={handleRenameKeyPress}
                          className={styles.editInput}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          className={styles.editButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveRename();
                          }}
                          title="Save"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          className={`${styles.editButton} ${styles.cancelButton}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelRename();
                          }}
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className={styles.favoriteTextContainer}>
                          <span className={styles.favoriteName}>{fav.name}</span>
                          <span className={styles.favoritePreview}>
                            {(fav.text || "").slice(0, 30)}...
                          </span>
                        </div>

                        <div
                          className={styles.menuContainer}
                          ref={openMenuId === fav.id ? menuRef : null}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className={styles.menuButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(fav.id);
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openMenuId === fav.id && (
                            <div className={styles.dropdownMenu}>
                              <button
                                className={styles.menuOption}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartRename(fav);
                                }}
                              >
                                <Edit2 size={14} />
                                <span>Rename</span>
                              </button>
                              <button
                                className={styles.menuOption}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadFavorite(fav.text, fav.name);
                                }}
                              >
                                <Download size={14} />
                                <span>Download</span>
                              </button>
                              <button
                                className={styles.menuOption}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFavorite(fav.id);
                                }}
                              >
                                <Trash2 size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p className={styles.noFavorites}>
                  {searchQuery ? "No favorites match your search" : "No favorites yet"}
                </p>
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* ================= Main Chat Area ================= */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to EduBuddy</h1>
          <p className={styles.subtitle}>
            Ask me anything about your courses, assignments, or school resources.
            I'm here to help!
          </p>
        </div>

        {/* Chat Messages */}
        <div className={styles.chatContainer} ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={
                message.sender === "bot"
                  ? styles.botMessageWrapper
                  : styles.userMessageWrapper
              }
            >
              {message.sender === "bot" ? (
                <>
                  <div className={styles.messageLabel}>EduBuddy</div>
                  <div className={styles.messageRow}>
                    <div className={styles.avatar}>
                      <img
                        src="/bot-avatar.png"
                        alt="EduBuddy Bot"
                        className={styles.avatarImage}
                      />
                    </div>
                    <div className={styles.botMessage}>
                      {message.type === "image" ? (
                        <img
                          src={message.src}
                          alt={message.name || "image"}
                          className={styles.uploadImage}
                        />
                      ) : message.type === "file" ? (
                        <a
                          href={message.href}
                          download={message.name}
                          className={styles.fileLink}
                        >
                          {message.name} ({Math.round((message.size || 0) / 1024)} KB)
                        </a>
                      ) : (
                        renderText(message.text || "")
                      )}

                      {index > 0 && message.type === "text" && (
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.copyBtn}
                            onClick={() => handleCopy(message.text, message.id)}
                            title="Copy Response"
                          >
                            <Copy size={16} />
                            {copiedId === message.id && (
                              <span className={styles.copiedText}>Copied!</span>
                            )}
                          </button>
                          <button
                            className={styles.downloadBtn}
                            onClick={() => handleDownload(message.text, index)}
                            title="Download Response"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            className={styles.favoriteBtn}
                            onClick={() => handleToggleFavorite(message)}
                            title={
                              isFavorite(message.id)
                                ? "Remove from Favorites"
                                : "Add to Favorites"
                            }
                          >
                            <Star
                              size={16}
                              fill={isFavorite(message.id) ? "#facc15" : "none"}
                              color={isFavorite(message.id) ? "#facc15" : "#9ca3af"}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.userLabel}>{message.username || "User"}</div>
                  <div className={styles.messageRow}>
                    <div className={styles.userMessage}>
                      {message.type === "bundle" ? (
                        <>
                          {message.text ? <div>{renderText(message.text)}</div> : null}
                          {message.attachments?.length ? (
                            <div className={styles.attachListInBubble}>
                              {message.attachments.map((att) =>
                                att.type === "image" ? (
                                  <img
                                    key={att.id}
                                    src={att.src}
                                    alt={att.name || "image"}
                                    className={styles.uploadImage}
                                  />
                                ) : (
                                  <a
                                    key={att.id}
                                    href={att.href}
                                    download={att.name}
                                    className={styles.fileLink}
                                  >
                                    {att.name} ({Math.round((att.size || 0) / 1024)} KB)
                                  </a>
                                )
                              )}
                            </div>
                          ) : null}
                        </>
                      ) : message.type === "image" ? (
                        <img
                          src={message.src}
                          alt={message.name || "image"}
                          className={styles.uploadImage}
                        />
                      ) : message.type === "file" ? (
                        <a
                          href={message.href}
                          download={message.name}
                          className={styles.fileLink}
                        >
                          {message.name} ({Math.round((message.size || 0) / 1024)} KB)
                        </a>
                      ) : (
                        renderText(message.text || "")
                      )}
                    </div>
                    <div className={styles.avatar}>
                      <img
                        src="/user-avatar.jpg"
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
          {/* Stack tray above the input row */}
          <div className={styles.inputWrapper} style={{ flexDirection: "column", alignItems: "stretch" }}>
            {pendingAttachments.length > 0 && (
              <div className={styles.attachTray}>
                {pendingAttachments.map((att) => (
                  <div key={att.id} className={styles.attachChip} title={att.name}>
                    {att.type === "image" ? (
                      <img src={att.src} alt={att.name} className={styles.attachThumb} />
                    ) : (
                      <Paperclip size={14} />
                    )}
                    <span className={styles.attachLabel}>
                      {att.name} • {Math.round((att.size || 0) / 1024)} KB
                    </span>
                    <button
                      className={styles.attachRemove}
                      onClick={() => removePendingAttachment(att.id)}
                      aria-label="Remove attachment"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.inputRow}>
              <textarea
                id="edubuddy-textarea"
                placeholder="Type your question here..."
                className={styles.messageInput}
                value={inputMessage}
                onChange={handleTextareaChange}
                onKeyDown={handleInputKeyDown}
                rows={1}
              />
              <div className={styles.inputActions}>
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFilesSelected}
                  style={{ display: "none" }}
                />
                <button
                  className={styles.iconButton}
                  onClick={toggleListen}
                  title={isListening ? "Stop voice" : "Start voice"}
                >
                  <Mic size={20} />
                </button>
                <button
                  className={styles.iconButton}
                  onClick={handleAttachClick}
                  title="Attach files"
                >
                  <Paperclip size={20} />
                </button>
                <button className={styles.sendButton} onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Favorite Modal */}
      {selectedFavorite && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleContainer}>
                <Star size={20} className={styles.modalStarIcon} />
                <h2 className={styles.modalTitle}>{selectedFavorite.name}</h2>
              </div>
              <button className={styles.modalCloseButton} onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <p className={styles.modalText}>{selectedFavorite.text}</p>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.modalActionButton}
                onClick={() => handleModalCopy(selectedFavorite.text)}
              >
                <Copy size={18} />
                {modalCopied ? "Copied!" : "Copy"}
              </button>
              <button
                className={styles.modalActionButton}
                onClick={() =>
                  handleModalDownload(selectedFavorite.text, selectedFavorite.name)
                }
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;
