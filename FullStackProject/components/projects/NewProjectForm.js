// pages/update-project/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UpdatedProjectForm from '../../components/projects/UpdateProjectForm';

function UpdatedProjectPage() {
  const router = useRouter();
  const { id } = router.query; // Get the project ID from the URL
  const [project, setProject] = useState(null); // State to store project data
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  // Fetch project data when the component mounts
  useEffect(() => {
    if (id) {
      const fetchProjectData = async () => {
        try {
          const response = await fetch(`/api/get-project?id=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch project');
          }
          const data = await response.json();
          setProject(data.project); // Assuming the response contains a "project" field
        } catch (error) {
          console.error('Error fetching project data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProjectData();
    }
  }, [id]);

  // Handle the project update submission
  const updateProjectHandler = async (updatedProjectData) => {
    const response = await fetch('/api/update-project', {
      method: 'PUT',
      body: JSON.stringify(updatedProjectData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/'); // Redirect to home page on success
    } else {
      console.error('Failed to update project:', data.error);
    }
  };

  // If project data is available, render the UpdateProjectForm
  return (
    <UpdatedProjectForm project={project} onUpdateProject={updateProjectHandler} />
  );
}

export default UpdatedProjectPage;
