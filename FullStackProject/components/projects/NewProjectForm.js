import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewProjectForm.module.css';
import { useRouter } from 'next/router';

function NewProjectForm(props) {
  const router = useRouter();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      meetingId: enteredTitle,
      title: enteredTitle,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Project Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Project</button>
        </div>
      </form>
    </Card>
  );
}

export default NewProjectForm;
