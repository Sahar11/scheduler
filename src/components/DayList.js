import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days;
  console.log("days:"+props)
  const DayList = days.map((day) => (
    <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === day.value}
    setDay={props.setDay}
    />
  ))
  return (
    <ul>{DayList}</ul>
  );
}