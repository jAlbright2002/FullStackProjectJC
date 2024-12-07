import ViewTickets from '../../components/projects/ViewTickets'
import { useRouter } from 'next/router';

function ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;
    return <ViewTickets id={id} />;
    
}

export default ProjectDetails;