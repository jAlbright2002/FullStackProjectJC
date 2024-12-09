import { useEffect, useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewProjectForm.module.css';
import { useRouter } from 'next/router';

function UpdateProjectForm({ project }) {
  const router = useRouter();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  useEffect(() => {
    if (project) {
      titleInputRef.current.value = project.title;
      descriptionInputRef.current.value = project.description;
    }
  }, [project]);

  async function updateProjectHandler(projectId, title, description) {
    try {
      const response = await fetch(`/api/update-project?id=${projectId}`, {
        method: 'PUT',
        body: JSON.stringify({
          projectId,
          title,
          description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Project updated successfully');
        router.push(`/`);
      } else {
        console.error('Failed to update project', data);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
  
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
  
    try {
      const updatedProject = await updateProjectHandler(
        project.projectId,
        enteredTitle,
        enteredDescription
      );
      router.push(`/`);
    } catch (error) {
      console.error('Error during project update:', error);
    }
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
