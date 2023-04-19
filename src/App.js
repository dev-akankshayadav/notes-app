import React, {useState} from "react";
import "./App.css"; 
const App = () => {
  const[notes, setNotes] = useState([]);
  const[state, setState] = useState({
    id: Math.random() * 10,
    title: "",
    note: "",
  });
  
  const handleChange = (e) => {
   setState({ ...state, [e.target.name]:[e.target.value]})
  }

  const handleSubmit = (e) => {
    e.preventDefault();  
    console.log(state);
    setNotes([...notes, state]); 
    setState({
      title: "",
      note: "",
    })
  }

  const handleDelete = (title) => {
    const remainingNotes = notes.filter(note => note.title !== title);
    setNotes(remainingNotes);
  }

  return (
    <>
      <h1 className="text-center text-5xl p-5 "> Notes App </h1>
      <div className="create-note w-[400px] mx-auto">
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="border border-blue-80 mb-4 p-3 rounded-2xl"
            onChange={handleChange}
            value={state.title}
            required
          />
          <textarea
            name="note"
            id=""
            cols="30"
            rows="10"
            placeholder="note"
            className="border border-blue-80 p-3 rounded-2xl"
            onChange={handleChange}
            value={state.note}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 px-3 py-3 text-white mt-4 rounded-2xl "
          >
            Add Note
          </button>
        </form>
      </div>

      <div className="notes-container border-t-2 border-blue-300 m-10 flex flex-wrap">
       {notes.length > 0 ? notes.map((note,id) => {
        return (
          <div className="note bg-white mt-5 w-[200px] p-4  mr-2 relative" key={id}>
          <button className="delete-btn absolute right-2 font-bold text-2xl text-red-700" onClick={() => handleDelete(note.title)}>
            x
          </button>
          <h2 className="font-bold text-2xl text-black pb-2 border-b-2 border--300"> {note.title}</h2>
          <p className=" text-black flex flex-wrap">{note.note}</p>
        </div>
        )
       }) : <p> No notes available </p>}
      </div>
    </>
  );
};
export default App;
