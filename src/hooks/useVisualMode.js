import Appointment from "components/Appointment";
import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = function (current, replace = false) {
    replace && back();
    let newHistory = [...history];
    if (replace) {
      history.pop();
    }
    newHistory.push(current);
    setMode(current);
    setHistory(newHistory)

  }
  const back = function () {
    let newHistory = [...history];
    if(newHistory.length > 1){
      newHistory = newHistory.slice(0,-1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length-1]);
    } else {
      setMode(mode);
    }

  }
  return { mode, transition, back };

}
