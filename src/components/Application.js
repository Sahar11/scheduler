/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from "axios";

import "components/Application.scss";

  // const appointments = [
  //   {
  //     id: 1,
  //     time: "12pm",
  //   },
  //   {
  //     id: 2,
  //     time: "1pm",
  //     interview: {
  //       student: "Lydia Miller-Jones",
  //       interviewer:{
  //         id: 3,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       }
  //     }
  //   },
  //   {
  //     id: 3,
  //     time: "2pm",
  //   },
  //   {
  //     id: 4,
  //     time: "3pm",
  //     interview: {
  //       student: "Archie Andrews",
  //       interviewer:{
  //         id: 4,
  //         name: "Cohana Roy",
  //         avatar: "https://i.imgur.com/FK8V841.jpg",
  //       }
  //     }
  //   },
  //   {
  //     id: 5,
  //     time: "4pm",
  //   }
  // ];
  
  // const interviewers = [
  //   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  //   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  //   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  //   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  //   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  // ];
 
  export default function Application(props) {
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers:{}
    });
  
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers= getInterviewersForDay(state, state.day);
    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
     
    console.log("inter:",interviewers);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
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