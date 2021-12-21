import React, { useState } from "react";
import logo from "../cloud.svg";
import "../App.css";
export default function Login(props) {
  const {mode} = props;
  const url = "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    const rule =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return rule.test(email);
  };
  const submit = async () => {
    if (validateEmail(email)) {
      const data = { email, password };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const content = await response.json();
      console.log(content);
      if (content.message) {
      } else {
        const { token } = content;
        localStorage.setItem("token", token);
        mode(2)
      }
    }
  };

  return (
    <div>
      <header>
        <span className="Title">Cloud_Notes</span>
      </header>
      <img src={logo} className="Cloud" alt="logo" />
      <form>
        <input
          type="email"
          className="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
        />
        <input
          type="password"
          className="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
        />
      </form>
      <button
        className="submit"
        onClick={() => {
          submit();
        }}
      >
        Login
      </button>
    </div>
  );
}
