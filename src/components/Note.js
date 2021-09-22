import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import {useHistory} from "react-router-dom"

export default function Note(props) {
  const context = useContext(noteContext);
  const { notes, getNote, updateNote } = context;
  const history = useHistory();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      history.push('/signup')
    }else{
      getNote();
    }
    // eslint-disable-next-line
  }, []);
  const {showAlert} = props;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    eauthor: "",
  });
  const updateNotes = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      eauthor: currentNote.author,
    });
    
  };
  
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    ref.current.click();
    setnote({ etitle: "", edescription: "", eauthor: "" },console.log("Refreshed"));
    updateNote(note.id, note.etitle, note.eauthor, note.edescription);
    showAlert("Your Note Has been Upgraded","success")
  };

  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        ref={ref}
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="" className="my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    name="etitle"
                    onChange={onchange}
                    minLength={3}
                    required
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eauthor"
                    name="eauthor"
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    minLength={3}
                    required
                    value={note.eauthor}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    minLength={5}
                    required
                    value={note.edescription}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                disabled={
                  (note.etitle.length < 5,
                  note.eauthor.length < 3,
                  note.edescription.length < 5)
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-2">
        <h1>Your Notes</h1>
        {notes.length === 0 && (
          <h2 className="text-center text-muted d-flex justify-content-center">
            Nothing to preview!
          </h2>
        )}
        <div className="row my-3">
          {notes.map((note) => {
            return <NoteItem showAlert={showAlert} key={note._id} note={note} update={updateNotes} />;
          })}
        </div>
      </div>
    </>
  );
}
