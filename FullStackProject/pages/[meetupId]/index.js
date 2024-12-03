import projectChanger from '../../components/projects/ProjectPage'
import NewProjectForm from '../../components/projects/NewProjectForm'
import { useRouter } from 'next/router';

function ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;
    return <NewProjectForm id={id} />;
    
}

export default ProjectDetails;