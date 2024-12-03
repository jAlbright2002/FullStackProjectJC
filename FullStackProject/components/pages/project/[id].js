import { useRouter } from 'next/router';
import ProjectPage from '../../components/projects/ProjectPage'; 

function projectDetail(){
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
          <ProjectPage id={id} />
        </div>
      );
}

export default projectDetail;