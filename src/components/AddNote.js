import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", author: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.author);
    setnote({title: "", description: "", author: "" })
    props.showAlert("Your Note has been added","success")
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1 className="title my-3">Add Your Notes Here.!</h1>
      <form action="" className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name="title"
            onChange={onchange}
            minLength={3} required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={3} required
            value={note.author}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
            minLength={5} required
            value={note.description}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length === 0 || note.author.length === 0 || note.description.length === 0}>
         Add Note
        </button>
      </form>
    </div>
  );
}
