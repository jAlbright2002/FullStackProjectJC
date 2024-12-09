import { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TaskCard from './ProjectPage';

function TicketPage() {
    const [tickets, setTickets] = useState([]);

function addTicketHandler(ticketData) {
    setTickets((prevTickets) => [...prevTickets, ticketData]);
}

return (
    <div>
      <NewTicketForm onAddTicket={addTicketHandler} />
      <div className="task-board">
        {tickets.map((ticket, index) => (
          <TaskCard key={ticket.ticketId} item={ticket} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TicketPage;
    