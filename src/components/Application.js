/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from "axios";

import "components/Application.scss";
 
  export default function Application(props) {
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers:{}
    });
    function bookInterview(id, interview) {
      //console.log(id, interview);

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
    return  axios.put(`/api/appointments/${id}`,appointment)
      .then(response => setState((prev) => ({...prev, appointments })))
      .catch((err) => console.log(err.message));
      
    }

    const cancelInterview = function (id) {
 //set appointment interview to null
 const appointment = {
   ...state.appointments[id],
   interview: null
 }
 const appointments = {
  ...state.appointments,
  [id]: appointment
};
return axios.delete(`/api/appointments/${id}`)
      .then(response => setState((prev) => ({...prev, appointments })));

    }
    
  
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers= getInterviewersForDay(state, state.day);
    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
     
    console.log("interview:",interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteInterview={cancelInterview}
        />
      );
    });
  
    const setDay = day => setState({ ...state, day });
    // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  
    useEffect(() => {
      Promise.all([
     axios.get("http://localhost:8001/api/days"),
     axios.get("http://localhost:8001/api/appointments"),
     axios.get("http://localhost:8001/api/interviewers")
    ]).then((all)=> {
      console.log('response',all);
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
      //setTest(all[0].data);
      //console.log("Test:", test);
      //console.log("State:", state)
    });
  }, []);

    return (
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebarseparator sidebar--centered" />
          <nav className="sidebarmenu">
            <DayList  days={state.days} day={state.day} onChange={setDay}  />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          {schedule}
          <Appointment key="last" time="5pm" interviewers={ state.interviewers }/>
        </section>
      </main>
    );
  } 