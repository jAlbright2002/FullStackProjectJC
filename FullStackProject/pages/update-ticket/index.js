import { useEffect, useState } from 'react';
import UpdateTicketForm from '../../components/projects/UpdateTicketForm'; 
import { useRouter } from 'next/router';

function UpdatedTicketPage() {
  const router = useRouter();
  const [ticket, setTicket] = useState(null); 

  useEffect(() => {
    if (router.query.id) {
      async function fetchTicket() {
        try {
          const response = await fetch(`/api/get-ticket?id=${router.query.id}`);
          const data = await response.json();
          setTicket(data); 
        } catch (error) {
          console.error('Error fetching ticket:', error);
        }
      }
      fetchTicket();
    }
  }, [router.query.id]);

  return <UpdateTicketForm ticket={ticket} />
}

export default UpdatedTicketPage;
