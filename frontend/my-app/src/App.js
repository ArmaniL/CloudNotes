import React from "react";
import Loginpage from "./components/login";
import "./App.css";
import Homepage from "./components/home";

const Mode = {
  signUp: 0,
  loginIn: 1,
  loggedIn: 2,
};

export default function App(props) {
  const [mode, setMode] = useState(Mode.loginIn);

  if (mode === Mode.signUp) {
  } else if (mode === Mode.loginIn) {
    return <Loginpage></Loginpage>;
  } else if (mode === Mode.loggedIn) {
    return <Homepage></Homepage>;
  }
}
