import React, { useState } from "react";
import "./App.css";
import { FaTimes, FaPlus } from "react-icons/fa";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  //adding state for Title and Description
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [notes, setNotes] = useState([{ title: "", description: "" }]);
  console.log(notes);

  function handleOpenModal() {
    setOpenModal(true);
    setNoteTitle("");
    setNoteDescription("");
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  // console.log(`Title: ${noteTitle}, Description: ${noteDescription}`);

  function handleSave() {
    const newNote = {
      title: noteTitle,
      description: noteDescription,
    };
    setNotes([...notes, newNote]);
    handleCloseModal();
  }

  // console.log(notes);

  return (
    <>
      <div className="notes-app">
        <h1> Notes App</h1>
        <button
          className="save-btn"
          onClick={handleOpenModal}
          title="add note"
        >
          <FaPlus />
        </button>
      </div>
      {openModal ? (
        <div className="modal">
          <button
            className="close-btn"
            onClick={handleCloseModal}
            title="close"
          >
            <FaTimes />
          </button>
          <input
            className="title-here"
            name="title"
            type="text"
            placeholder="Title-1"
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <input
            type="text"
            className="title-here"
            placeholder="Write your notes here"
            name="description"
            onChange={(e) => setNoteDescription(e.target.value)}
            value={noteDescription}
          />
          <button className="save-btn" title="save" onClick={handleSave}>
            <FaPlus/>
          </button>
        </div>
      ) : (
        <>
          {notes.map((note) => {
            return (
              <div className="note">
                <p className="title">{note.title}</p>
                <p className="description">{note.description}</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
