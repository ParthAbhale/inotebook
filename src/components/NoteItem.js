import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,update,showAlert } = props;

  const deletation = () => {
    deleteNote(note._id)
    showAlert("Your note has been deleted Successfully","success")
  }
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h5 className="card-title">{note.author}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between aling-items-center">
            <i className="fas fa-trash"  onClick={deletation}></i>
            <i className="fas fa-edit" onClick={()=>{update(note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
