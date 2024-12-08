import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../components/projects/ProjectPage'), {
  ssr: false,
});

import { useRouter } from 'next/router';

function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;

  return <App id={id} />;
}

export default ProjectDetails;
