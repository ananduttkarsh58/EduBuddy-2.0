import React, { useState, useRef, useEffect } from "react";
import styles from "./main.module.css";
import { Paperclip, Mic, Send, Copy, Download, X } from "lucide-react";

const Main = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hi there! How can I assist you today?" },
    { id: 2, sender: "user", text: "Can you help me find resources for my history class?" },
    { id: 3, sender: "bot", text: "Of course! What specific topics are you studying in your history class?" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [attachedFileUrl, setAttachedFileUrl] = useState(null);
  const [modalFile, setModalFile] = useState(null); // file to show in modal
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (attachedFileUrl) URL.revokeObjectURL(attachedFileUrl);
    };
  }, [attachedFileUrl]);

  const handleAttachClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (attachedFileUrl) URL.revokeObjectURL(attachedFileUrl);

    const url = URL.createObjectURL(f);
    setAttachedFile(f);
    setAttachedFileUrl(url);

    e.target.value = "";
  };

  const removeAttachedFile = () => {
    if (attachedFileUrl) URL.revokeObjectURL(attachedFileUrl);
    setAttachedFile(null);
    setAttachedFileUrl(null);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !attachedFile) return;

    const id = messages.length + 1;
    const newMsg = {
      id,
      sender: "user",
      text: inputMessage.trim(),
      attachment: attachedFile
        ? {
            name: attachedFile.name,
            size: attachedFile.size,
            url: attachedFileUrl,
            type: attachedFile.type,
          }
        : null,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);

    // reset composer, keep input area same look & placement
    setInputMessage("");
    setAttachedFile(null);
    setAttachedFileUrl(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const copyText = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  // Open modal when user clicks attachment in a message
  const openAttachmentModal = (attachment) => {
    if (!attachment) return;
    setModalFile(attachment);
  };

  const closeModal = () => setModalFile(null);

  return (
    <div className={styles.main}>
      {/* header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to EduBuddy</h1>
        <p className={styles.subtitle}>
          Ask me anything about your courses, assignments, or school resources. I'm here to help!
        </p>
      </div>

      {/* chat container */}
      <div className={styles.chatContainer}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.sender === "bot" ? styles.botMessageWrapper : styles.userMessageWrapper}
          >
            {m.sender === "bot" && <div className={styles.avatarLabel}>Teacher</div>}
            {m.sender === "user" && <div className={styles.userLabel}>Student</div>}

            <div className={styles.messageRow}>
              {m.sender === "bot" && (
                <div className={styles.botAvatar}>
                  <img src="https://via.placeholder.com/40" alt="Bot" className={styles.avatarImage} />
                </div>
              )}

              <div className={m.sender === "bot" ? styles.botMessage : styles.userMessage}>
                {/* Attachment block — NO download icon in the bubble.
                    Clicking opens the modal card in front of screen */}
                {m.attachment && (
                  <div
                    className={styles.attachmentBlock}
                    onClick={() => openAttachmentModal(m.attachment)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") openAttachmentModal(m.attachment);
                    }}
                    title="Open attachment"
                  >
                    {m.attachment.type && m.attachment.type.startsWith("image/") ? (
                      <div className={styles.attachmentPreviewSmall}>
                        <img src={m.attachment.url} alt={m.attachment.name} />
                      </div>
                    ) : (
                      <div className={styles.attachmentIconSmall}>
                        <Paperclip size={14} />
                      </div>
                    )}

                    <div className={styles.attachmentMeta}>
                      <div className={styles.attachmentName}>{m.attachment.name}</div>
                      <div className={styles.attachmentSize}>{formatSize(m.attachment.size)}</div>
                    </div>
                    {/* intentionally no download link/icon here */}
                  </div>
                )}

                {/* message text (if present) with copy / download .txt actions kept */}
                {m.text && (
                  <div className={styles.textWithActions}>
                    <div className={styles.messageText}>{m.text}</div>
                    <div className={styles.messageActions}>
                      <button
                        className={styles.iconButton}
                        onClick={() => copyText(m.text)}
                        title="Copy message"
                        type="button"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => {
                          // download .txt
                          const blob = new Blob([m.text], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `message-${m.id}.txt`;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          URL.revokeObjectURL(url);
                        }}
                        title="Download .txt"
                        type="button"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {m.sender === "user" && (
                <div className={styles.userAvatar}>
                  <img src="https://via.placeholder.com/40" alt="User" className={styles.avatarImage} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section — kept same structure as your original (so visual won't change) */}
      <div className={styles.inputSection}>
        <div className={styles.inputContainer}>
          {/* Keep composer attachment preview small and non-invasive, above the input field.
              If you prefer it inside the input area visually, we can tweak styles — for now minimal. */}
          {attachedFile && (
            <div className={styles.attachedComposerInline}>
              <div className={styles.attachedComposerInfo}>
                {attachedFile.type && attachedFile.type.startsWith("image/") ? (
                  <img src={attachedFileUrl} alt="thumb" className={styles.composerThumbSmall} />
                ) : (
                  <div className={styles.composerFileIconSmall}><Paperclip size={14} /></div>
                )}
                <div className={styles.composerText}>
                  <div className={styles.composerName}>{attachedFile.name}</div>
                  <div className={styles.composerSize}>{formatSize(attachedFile.size)}</div>
                </div>
              </div>
              <div className={styles.composerActionsSmall}>
                <button className={styles.iconButton} onClick={removeAttachedFile} title="Remove file" type="button">
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* original-like input control (type="text") — unchanged */}
          <textarea
            className={styles.messageInput}
            value={inputMessage}
            placeholder="Type your message..."
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
    // Shift+Enter → allow newline normally
          }}
          rows={1}
        />

          <div className={styles.inputActions}>
            <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
            <button className={styles.iconButton} onClick={handleAttachClick} type="button" title="Attach">
              <Paperclip size={20} />
            </button>

            <button className={styles.iconButton} type="button" title="Voice">
              <Mic size={20} />
            </button>

            <button className={styles.sendButton} onClick={handleSendMessage} type="button">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Attachment modal/card shown in front of screen when an attachment is clicked */}
      {modalFile && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>{modalFile.name}</div>
              <button className={styles.iconButton} onClick={closeModal} title="Close" type="button">
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {modalFile.type && modalFile.type.startsWith("image/") ? (
                <img src={modalFile.url} alt={modalFile.name} className={styles.modalImage} />
              ) : (
                <div className={styles.modalFileInfo}>
                  <div><strong>File:</strong> {modalFile.name}</div>
                  <div><strong>Size:</strong> {formatSize(modalFile.size)}</div>
                  <div><strong>Type:</strong> {modalFile.type || "—"}</div>
                  <div className={styles.modalNote}>Preview not available for this file type.</div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.secondaryButton} onClick={closeModal} type="button">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
