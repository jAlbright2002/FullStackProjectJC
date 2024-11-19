import ProjectItem from './ProjectItem';
import classes from './ProjectList.module.css';

function ProjectList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <ProjectItem
          key={meetup.meetingId}
          id={meetup.meetingId}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
