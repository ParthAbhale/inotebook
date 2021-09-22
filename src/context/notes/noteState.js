import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);
  const addNote = async (title, author, description) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,author,description})
    });
    const json = await response.json();
    setnotes(notes.concat(json))
  };

  // I learnt a lesson from this code snippet :)
  // const addNote = async (title, description, author) => {
  //   const response = await fetch(`${host}/api/notes/addnote`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth-token":  localStorage.getItem('token')
  //     },
  //     body: JSON.stringify({title, description, author})
  //   });
  //   const json = await response.json();
  //   setnotes(notes.concat(json))
  // }

  const getNote = async() => {
    const response = await fetch(`${host}/api/notes/fetchnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')
      }
    });
    // window['location'].reload()
    //I solved this error :)
    // const json = await response.json(); 
    // console.log(json)
    const newNotes = notes.filter((notes) => { return (notes._id !== id )})
    setnotes(newNotes)
  }

  const updateNote = async(id,title,author,description) =>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, author})
    });
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    console.log(newNotes)

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].author = author;
        newNotes[index].description = description;
        break;
      }
    }
    
    setnotes(newNotes)
  }
  //Again I learnt a Lesson from this code snippet.........
  // const updateNote = async(id,title,author,description) =>{
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth-token":  localStorage.getItem('token')
  //     },
  //     body: JSON.stringify({title, description, author})
  //   });
  //   const json = await response.json();
  //   console.log(json)

  //   let newNotes = JSON.parse(JSON.stringify(notes))

  //   for (let index = 0; index < newNotes.length; index++) {
  //     const element = newNotes[index];
  //     if(element.id === id){
  //       newNotes[index].title = title;
  //       newNotes[index].author = author;
  //       newNotes[index].description = description;
  //       break;
  //     }
  //   }
  //   setnotes(newNotes)
  // }

  // const updateNote = async (id, title, description, author) => {
  //   // API Call 
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth-token":  localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify({title, description, author})
  //   });
  //   const json = await response.json();
  //   console.log(json)

  //    let newNotes = JSON.parse(JSON.stringify(notes))
  //   // Logic to edit in client
  //   for (let index = 0; index < newNotes.length; index++) {
  //     const element = newNotes[index];
  //     if (element._id === id) {
  //       newNotes[index].title = title;
  //       newNotes[index].author = author; 
  //       newNotes[index].description = description;
  //       break; 
  //     }
  //   }  
  //   setnotes(newNotes);
  // }
 
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote,getNote,updateNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
