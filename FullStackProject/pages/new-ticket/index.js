// our-dimain.com/new-ticket
import NewTicketForm from '../../components/projects/NewTicketForm'
import { useRouter } from 'next/router';

function NewTicketPage() {
    const router = useRouter();
    async function addTicketHandler(enteredTicketData)  {
        const response = await fetch('/api/new-ticket', {
            method: 'POST',
            body: JSON.stringify(enteredTicketData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        router.push('/');
    }

    return <NewTicketForm onAddTicket={addTicketHandler} />
}

export default NewTicketPage