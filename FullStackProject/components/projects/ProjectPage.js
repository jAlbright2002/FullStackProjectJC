import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ProjectPage.module.css'; 
import { useRouter } from 'next/router';

const TaskCard = ({ item, index }) => {
  const router = useRouter();
  
  return (
    <Draggable key={item.ticketId} draggableId={item.ticketId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card"
        >
          <div className="task-information">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;