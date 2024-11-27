import classes from './ProjectDetail.module.css'

function ProjectDetail(props) {
    return (
        <section className={classes.detail}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </section>
    )
}

export default ProjectDetail