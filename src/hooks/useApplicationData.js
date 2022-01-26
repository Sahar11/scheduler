import { useState, useEffect } from "react";
import axios from "axios";
import searchDayByAppointment from "helpers/selectors"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log('response', all);
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }));
    });
  }, []);

  const updateSpots = function (id) {
    axios.get('api/days')
      .then((response) => {
        setState((prev) => ({ ...prev, days: response.data }))
      })
  }


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
    //console.log(":OLAAAA", id);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => setState((prev) => ({ ...prev, appointments })),
        updateSpots(id))
    //.catch((err) => console.log(err.message));

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
      .then(response => setState((prev) => ({ ...prev, appointments, updateSpots })),
        updateSpots(id)
      );

  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}