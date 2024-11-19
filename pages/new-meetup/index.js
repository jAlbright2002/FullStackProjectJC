// our-dimain.com/new-meetup
import NewProjectForm from '../../components/projects/NewProjectForm'
import { useRouter } from 'next/router';

function NewProjectPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData)  {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        router.push('/');
    }

    return <NewProjectForm onAddMeetup={addMeetupHandler} />
}

export default NewProjectPage