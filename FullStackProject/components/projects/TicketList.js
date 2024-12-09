import ViewTickets from './ViewTickets'
import classes from './TicketList.module.css';

function TicketList(props){
    return (
        <ul className={classes.list}>
          {props.meetups.map((meetup) => (
            <ViewTickets
              key={meetup.meetingId}
              id={meetup.meetingId}
              title={meetup.title}
            />
          ))}
        </ul>
      );
}

export default TicketList;