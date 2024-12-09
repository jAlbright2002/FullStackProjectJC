import { useEffect, useState } from 'react';
import UpdateProjectForm from '../../components/projects/UpdateProjectForm'; // Adjust path as needed
import { useRouter } from 'next/router';

function UpdatedProjectPage() {
  const router = useRouter();
  const [project, setProject] = useState(null); // Use React state to persist data

  useEffect(() => {
    if (router.query.id) {
      async function fetchProject() {
        try {
          const response = await fetch(`/api/get-project?id=${router.query.id}`);
          const data = await response.json();
          setProject(data); // Ensure your API sends data.project
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
      fetchProject();
    }
  }, [router.query.id]);

  return <UpdateProjectForm project={project} />
}

export default UpdatedProjectPage;
