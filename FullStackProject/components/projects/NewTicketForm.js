import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewTicketForm.module.css';

function NewTicketForm(props) {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const projectInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredTitle = titleInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      const enteredProject = projectInputRef.current.value;
  
      const ticketData = {
        title: enteredTitle,
        description: enteredDescription,
        project: enteredProject
      };
  
      props.onAddTicket(ticketData);
    }
  
    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>Ticket Title</label>
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
          <div className={classes.control}>
            <label htmlFor='project'>Project Name</label>
            <input type='text' required id='project' ref={projectInputRef} />
          </div>
          <div className={classes.actions}>
            <button>Add Ticket</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default NewTicketForm;
  