import Card from '../ui/Card';
import classes from './ProjectItem.module.css';
import { useRouter } from 'next/router';

function ProjectItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    //This should route to the task list page
    //router.push(`/update-project?id=${props.id}`);
  }

  async function deleteProjectHandler() {
    try {
      const response = await fetch(`/api/delete-project?id=${props.id}`);
      response, {
        method: 'DELETE',
      };
      if (response.ok) {
        console.log('Project deleted successfully');
        router.reload('/');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes['container']}>
          <div className={classes.content}>
            <h3>{props.title}</h3>
          </div>
          <div className={classes.actions}>
            <button onClick={showDetailsHandler}>Show Details</button>
            <button className={classes.delete} onClick={deleteProjectHandler}>Delete</button>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default ProjectItem;
