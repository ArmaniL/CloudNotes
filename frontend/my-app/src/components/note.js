import React from "react";
import "../App.css";
import { useState } from "react";
export default function Note(props) {
  const { header, content } = props.note;
  const [text, setText] = useState(content);
  const [textHeader, setHeader] = useState(header);
  console.log(header);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <h1>{header}</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(text + e.target.value);
        }}
      ></input>
    </div>
  );
}
