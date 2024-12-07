import { useRef, useEffect } from 'react';

import Card from '../ui/Card';
import classes from './NewTicketForm.module.css';
import { createId } from '@paralleldrive/cuid2';

function NewTicketForm(props) {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const projectSelectRef = useRef();

    useEffect(() => {
      getAllProjects()
    }, []);

    async function getAllProjects() {
      try {
        const response = await fetch('/api/get-projects', {
          method: 'POST',
          body: JSON.stringify({ projects: 'all' }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
    
        const { projects } = await response.json(); // Assuming the response has a `projects` array
    
        const projectSelect = projectSelectRef.current;
    
        // Clear existing options
        projectSelect.innerHTML = '<option value="" disabled>Select a project</option>';
    
        // Populate the dropdown with projects
        projects.forEach((project) => {
          const option = document.createElement('option');
          option.value = project.projectId; // Assuming `projectId` exists
          option.textContent = project.title; // Assuming `title` exists
          projectSelect.appendChild(option);
        });
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredTitle = titleInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      const selectedProject = projectSelectRef.current.value;
  
      const ticketData = {
        ticketId: createId(),
        title: enteredTitle,
        description: enteredDescription,
        project: selectedProject
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
          <label htmlFor="project">Project Name</label>
          <select id="project" required ref={projectSelectRef}>
            <option value="" disabled>
              Select a project
            </option>
            {}
          </select>
          </div>
          <div className={classes.actions}>
            <button>Add Ticket</button>
          </div>
        </form>
      </Card>
    );
  }
  
  export default NewTicketForm;
  