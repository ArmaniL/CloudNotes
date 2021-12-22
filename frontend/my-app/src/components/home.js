import React, { useEffect } from "react";
import "../App.css";
import Note from "./note";
import notesvg from "../note.svg";
import { useState } from "react";
export default function HomePage(props) {
  const [notes, setNotes] = useState([]);
  const [focusedNote, setFocusedNote] = useState({});
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    //Get token
    const token = localStorage.getItem("token");
    //if token is valid
    if (token) {
      //setup up fetch
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        "http://localhost:5000/notes",
        requestOptions
      );
      try {
        if (response.status === 403) {
          localStorage.removeItem("token");
        } else {
          const result = await response.json();
          console.log(result);
          setNotes(result.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <header>
        <span className="Title">Cloud Notes</span>
      </header>

      <div
        style={{
          overflowX: "auto",
          display: "flex",
          flexWrap: "nowrap",
          overflow: "hidden",
          marginLeft: "9vh",
        }}
      >
        {notes.map((note) => {
          return (
            <div
              key={note["_id"]}
              style={{
                flex: "0 0 auto",
                padding: "0px",
                marginRight: "20px",
                width: "100px",
              }}
              onClick={() => {
                setFocusedNote(note);
                console.log(focusedNote);
              }}
            >
              <img src={notesvg} style={{ width: "300%" }}></img>
            </div>
          );
        })}
      </div>
      <div>
        {focusedNote != undefined ? <Note note={focusedNote}></Note> : <></>}
      </div>
    </div>
  );
}
