import NewProjectForm from '../../components/projects/NewProjectForm'
import { useRouter } from 'next/router';

function NewProjectPage() {
    const router = useRouter();
    async function addProjectHandler(enteredProjectData)  {
        const response = await fetch('/api/new-project', {
            method: 'POST',
            body: JSON.stringify(enteredProjectData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        router.push('/');
    }

    return <NewProjectForm onAddProject={addProjectHandler} />
}

export default NewProjectPage