import TaskCard from '../../components/projects/ProjectPage';
import { useRouter } from 'next/router';

function ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;
    return <TaskCard id={id} />;
    
}

export default ProjectDetails;