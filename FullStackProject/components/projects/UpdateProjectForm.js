import { useState, useEffect, useRef } from 'react';
import Card from '../ui/Card';
import { updateProjectData } from '../../pages/api/update-project'
import classes from './NewProjectForm.module.css';

function UpdateProjectForm({ project, onUpdateProject }) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  useEffect(() => {
    if (project) {
      titleInputRef.current.value = project.title;
      descriptionInputRef.current.value = project.description;
    }
  }, [project]);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const updatedProject = await updateProjectData(project.projectId, enteredTitle, enteredDescription);

    onUpdateProject(updatedProject);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Project Title</label>
          <input
            type='text'
            defaultValue={project?.title || ''}
            required
            id='title'
            ref={titleInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            defaultValue={project?.description || ''}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Update Project</button>
        </div>
      </form>
    </Card>
  );
}

export default UpdateProjectForm;
