import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './ProjectPage.module.css'; 

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-information">
            <p>{item.Task}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;