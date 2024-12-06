import ProjectItem from './ProjectItem';
import classes from './ProjectList.module.css';

function ProjectList(props) {
  return (
    <ul className={classes.list}>
      {props.projects.map((project) => (
        <ProjectItem
          key={project.projectId}
          id={project.projectId}
          title={project.title}
        />
      ))}
    </ul>
  );
}

export default ProjectList;
