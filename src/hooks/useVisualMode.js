import Appointment from "components/Appointment";
import React, { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = function (newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    history.push(newMode);
    setMode(newMode);
    setHistory(history)

  }
  const back = function () {
    if(history.length > 1){
      history.pop();
      setHistory(history);
      setMode(history[history.length-1]);
    } else {
      setMode(mode);
    }

  }
  return { mode, transition, back };

}
