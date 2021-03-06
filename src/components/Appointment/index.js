import React from 'react'
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"
export default function Appointment(props) {
  const { id, interview, interviewers, bookInterview } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

  );
  //console.log("Props",props);
// save appointment
  function save(name, interviewer) {
    console.log("SAVEFUNCTION",interviewer);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  }
  // delete appointment
  function destroy() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

  }
  // delete confirmation function
  function confirmDelete() {
    transition(CONFIRM);
  };
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving..."
        />
      )}
      {mode === DELETE && (
        <Status message="Deleting..."
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message="Are you sure you want to cancel this appointment?"
          onCancel={() => back()}
          onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => { back() }}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error occured when saving"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error occured when deleting"
          onClose={() => back()}
        />
      )}
  
    </article>
  )
}
