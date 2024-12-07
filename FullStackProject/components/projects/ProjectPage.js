import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ProjectPage.module.css'; 
import { useRouter } from 'next/router';

const TaskCard = ({ id, item, index }) => {
  const router = useRouter();
  
  return (
    <Draggable key={id} draggableId={id} index={index}>
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