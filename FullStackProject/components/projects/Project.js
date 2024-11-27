import ProjectItem from './ProjectItem';
import classes from './ProjectList.module.css';

function ProjectList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <ProjectItem
          key={meetup.meetingId}
          id={meetup.meetingId}
          title={meetup.title}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
