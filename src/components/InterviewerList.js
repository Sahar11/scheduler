import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from "prop-types";

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};


export default function InterviewerList(props) {
  
  const interviewersListItem = Object.values(props.interviewers).map(interviewer => {
    return (
    <InterviewerListItem 
    key={interviewer.id}
    avatar={interviewer.avatar} 
    name={interviewer.name} 
    selected={interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}
    />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersListItem}</ul>
    </section>
  );
}