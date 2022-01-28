import { getAppointmentsForDay } from './selectors';

//interview will be removed when its set to null
export function updateAppointments(state, interview, id) {
  const appointment = {
    ...state.appointments[id],
    interview: interview ? { ...interview } : null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return appointments;
}


export function updateSpots({ days, appointments }, id) {
  const dayIndex = days.findIndex(d => d.appointments.includes(id));
  const dayName = days[dayIndex].name;
  
  const newSpots = getAppointmentsForDay({ days, appointments }, dayName)
  .filter(appointment => !appointment.interview)
  .length;
  
  const newDays = [...days];
  newDays[dayIndex] = { ...days[dayIndex], spots: newSpots };
  
  return newDays;

}


