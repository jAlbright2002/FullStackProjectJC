// our-dimain.com/new-project
import UpdatedProjectForm from '../../components/projects/UpdateProjectForm'
import { useRouter } from 'next/router';

function UpdatedProjectPage() {
    const router = useRouter();
    async function updateProjectHandler(enteredProjectData) {
  const response = await fetch(`/api/update-project?id=${enteredProjectData.id}`, {
    method: 'PUT',  // Use PUT for updates
    body: JSON.stringify(enteredProjectData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (response.ok) {
    console.log('Project updated successfully');
    router.push(`/project/${enteredProjectData.id}`);  // Redirect after successful update
  } else {
    console.error('Failed to update project', data);
  }
}

    return <UpdatedProjectForm onUpdateProject={updateProjectHandler} />
}

export default UpdatedProjectPage