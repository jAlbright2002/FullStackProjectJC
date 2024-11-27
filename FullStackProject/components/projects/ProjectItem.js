import Card from '../ui/Card';
import classes from './ProjectItem.module.css';
import { useRouter } from 'next/router';

function ProjectItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push('/' + props.id);
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
            </div>
        </div>
      </Card>
    </li>
  );
}

export default ProjectItem;
