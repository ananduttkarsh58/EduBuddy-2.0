// Main.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./main.module.css";

/**
 * Notes storage is now scoped per subject:
 * - localStorage key is `student_notes_<subject>`
 * - ensures notes added for one subject don't show in others
 */

const initialNotes = [];

const Main = () => {
  const location = useLocation();
  const subject = location.state?.subject || "Subject";

  // use a subject-scoped storage key
  const storageKey = `teacher_notes_${subject.replace(/\s+/g, "_")}`;

  // load saved notes for this subject only
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return initialNotes;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : initialNotes;
    } catch {
      return initialNotes;
    }
  });

  // file upload / add-note modal
  const [pendingFile, setPendingFile] = useState(null); // { fileName, title, fileData, mime, size }
  const fileInputRef = useRef(null);

  // action modal (centered card) for rename/delete
  const [actionIndex, setActionIndex] = useState(null);
  const [actionTitle, setActionTitle] = useState("");

  // preview modal index
  const [previewIndex, setPreviewIndex] = useState(null);

  // Persist only this subject's notes whenever notes change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (err) {
      console.warn("Failed to save notes to localStorage:", err);
    }
  }, [notes, storageKey]);

  // close modals on ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setActionIndex(null);
        setPreviewIndex(null);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const handleAddClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const formatNow = () => "Just now";

  // Read file as data URL (base64) so it can persist across reloads
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Failed to read file"));
      };
      reader.onload = () => {
        resolve(reader.result); // data URL
      };
      reader.readAsDataURL(file);
    });
  };

  const onFileSelected = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const MAX_SANE_BYTES = 2.5 * 1024 * 1024; // 2.5 MB
    if (f.size > MAX_SANE_BYTES) {
      const ok = window.confirm(
        "The file is large and might not be saved to localStorage (browser limit ~5MB). Continue anyway?"
      );
      if (!ok) {
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }

    try {
      const dataUrl = await readFileAsDataURL(f);
      setPendingFile({
        fileName: f.name,
        title: f.name,
        mime: f.type,
        size: f.size,
        fileData: dataUrl,
      });
    } catch (err) {
      console.error("Error reading file:", err);
      alert("Could not read the file. Try another file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const cancelPending = () => {
    setPendingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const confirmAdd = () => {
    if (!pendingFile) return;
    const newNote = {
      title: pendingFile.title,
      time: formatNow(),
      fileName: pendingFile.fileName,
      fileData: pendingFile.fileData, // data URL stored in localStorage
      fileSize: pendingFile.size,
      mime: pendingFile.mime,
    };

    setNotes((prev) => [newNote, ...prev]);
    setPendingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ACTION modal handlers
  const openActionModal = (index) => {
    setActionIndex(index);
    setActionTitle(notes[index]?.title || "");
  };

  const closeActionModal = () => {
    setActionIndex(null);
    setActionTitle("");
  };

  const saveRename = () => {
    if (actionIndex == null) return;
    const updated = [...notes];
    updated[actionIndex] = { ...updated[actionIndex], title: actionTitle || updated[actionIndex].title };
    setNotes(updated);
    closeActionModal();
  };

  const deleteNoteFromAction = () => {
    if (actionIndex == null) return;
    setNotes((prev) => prev.filter((_, i) => i !== actionIndex));
    closeActionModal();
  };

  // open preview modal for a note
  const openPreview = (index) => {
    setPreviewIndex(index);
  };

  const closePreview = () => {
    setPreviewIndex(null);
  };

  // delete from preview (same as delete), and close
  const deleteFromPreview = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
    setPreviewIndex(null);
  };

  // helper to render preview content; prefer fileData (data URL)
  const renderPreviewContent = (note) => {
    if (!note) return null;
    const mime = note.mime || "";
    const src = note.fileData || note.fileUrl || null;

    if (mime.startsWith("image/") && src) {
      return <img src={src} alt={note.fileName || note.title} style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: 8 }} />;
    }
    if (mime === "application/pdf" && src) {
      return <iframe title="pdf-preview" src={src} style={{ width: "100%", height: "60vh", border: "none", borderRadius: 8 }} />;
    }
    // fallback: show file info and big download button
    return (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{note.fileName || note.title}</div>
        <div style={{ color: "rgba(255,255,255,0.75)", marginBottom: 12 }}>
          {note.mime || "Unknown type"} • {note.fileSize ? `${(note.fileSize / 1024).toFixed(1)} KB` : ""}
        </div>
        <div style={{ marginTop: 8 }}>
          {src ? (
            <a href={src} download={note.fileName || note.title} className={styles.btnPrimary}>Download</a>
          ) : (
            <div style={{ color: "rgba(255,255,255,0.6)" }}>No file to download</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            <span className={styles.highlight}>{subject}</span> Notes
          </h1>

          <div className={styles.actions}>
            {/* <button className={styles.addBtn} onClick={handleAddClick}>+ Add Notes</button> */}
            <input ref={fileInputRef} type="file" onChange={onFileSelected} className={styles.hiddenFile} />
          </div>
        </div>

        {/* Notes List or empty state */}
        {notes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No notes yet for <strong>{subject}</strong>. </p>
          </div>
        ) : (
          <div className={styles.notesList}>
            {notes.map((note, index) => (
              <div
                key={index}
                className={styles.noteCard}
                onClick={(e) => {
                  const clickedMenu = e.target.closest("[data-menu-button]");
                  if (clickedMenu) return;
                  openPreview(index);
                }}
              >
                <div className={styles.left}>
                  <img src="https://via.placeholder.com/35" alt="Profile" className={styles.avatar} />
                  <div className={styles.titleWrap}>
                    <p className={styles.noteTitle}>{note.title}</p>
                    {note.fileName && <p className={styles.fileMeta}>{note.fileName}</p>}
                  </div>
                </div>

                <div className={styles.right}>
                  <span className={styles.time}>{note.time}</span>

                  {(note.fileData || note.fileUrl) && (
                    <a
                      href={note.fileData || note.fileUrl}
                      download={note.fileName || note.title}
                      className={styles.download}
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      ⤓
                    </a>
                  )}

                  <button
                    data-menu-button
                    className={styles.menuBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      openActionModal(index);
                    }}
                  >
                    ⋮
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Pending file modal (Add Note) */}
      {pendingFile && (
        <div className={styles.overlay} onClick={cancelPending}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Add Note</h3>
              <button className={styles.modalClose} onClick={cancelPending}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <label className={styles.modalLabel}>File</label>
              <div className={styles.fileRow}>
                <div className={styles.filePreview}>
                  {pendingFile.mime && pendingFile.mime.startsWith("image/") ? (
                    <img src={pendingFile.fileData} alt="preview" className={styles.fileIcon} />
                  ) : (
                    <div className={styles.fileIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>📎</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.fileName}>{pendingFile.fileName}</div>
                  <div className={styles.fileSize}>
                    {(pendingFile.size / 1024).toFixed(1)} KB • {pendingFile.mime || "unknown"}
                  </div>
                </div>
              </div>

              <label className={styles.modalLabel}>Title</label>
              <input
                className={styles.modalInput}
                value={pendingFile.title}
                onChange={(e) => setPendingFile((p) => ({ ...p, title: e.target.value }))}
              />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={cancelPending}>Cancel</button>
              <button className={styles.btnPrimary} onClick={confirmAdd}>Add Note</button>
            </div>
          </div>
        </div>
      )}

      {/* Action modal for Rename/Delete (centered card) */}
      {actionIndex != null && (
        <div className={styles.overlay} onClick={closeActionModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Note Options</h3>
              <button className={styles.modalClose} onClick={closeActionModal}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <label className={styles.modalLabel}>Title</label>
              <input
                className={styles.modalInput}
                value={actionTitle}
                onChange={(e) => setActionTitle(e.target.value)}
                autoFocus
              />

              <div style={{ height: 8 }} />

              <div style={{ display: "flex", gap: 10 }}>
                <button className={styles.btnDanger} onClick={deleteNoteFromAction}>Delete Note</button>

                <div style={{ flex: 1 }} />

                <button className={styles.btnSecondary} onClick={closeActionModal}>Cancel</button>
                <button className={styles.btnPrimary} onClick={saveRename}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {previewIndex != null && (
        <div className={styles.overlay} onClick={closePreview}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90%", width: 800 }}>
            <div className={styles.modalHeader}>
              <h3>{notes[previewIndex]?.title || "Preview"}</h3>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {(notes[previewIndex]?.fileData || notes[previewIndex]?.fileUrl) && (
                  <a
                    href={notes[previewIndex]?.fileData || notes[previewIndex]?.fileUrl}
                    download={notes[previewIndex]?.fileName || notes[previewIndex]?.title}
                    className={styles.btnSecondary}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                )}
                <button className={styles.modalClose} onClick={closePreview}>✕</button>
              </div>
            </div>

            <div className={styles.modalBody} style={{ alignItems: "stretch" }}>
              {renderPreviewContent(notes[previewIndex])}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={closePreview}>Close</button>
              {(notes[previewIndex]?.fileData || notes[previewIndex]?.fileUrl) && (
                <button
                  className={styles.btnDanger}
                  onClick={() => deleteFromPreview(previewIndex)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
