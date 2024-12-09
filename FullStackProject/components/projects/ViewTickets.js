import React from 'react';
import Card from '../ui/Card';
import classes from './ViewTickets.module.css'
import { useRouter } from 'next/router';

function ViewTickets(props){
    const router = useRouter();


function ShowDetailsHandler() {
    router.push('../../components/pages/new-ticket/_app');
  }


  return (
    <li className={classes.item}>
      <Card>
      <div className={classes.container}>
      <div className={classes.content}>
        <h3>{props.title}</h3>
      </div>
      <div className={classes.actions}>
        <button onClick={ShowDetailsHandler}>Add a new Ticket</button>
      </div>
    </div>
      </Card>
    </li>
  );

}

export default ViewTickets;

