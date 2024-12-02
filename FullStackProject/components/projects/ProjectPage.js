import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './ProjectPage.module.css';
import { useRouter } from 'next/router';

function projectDetails(props){
    const router = useRouter();

    function navigateToAddTicket(){
        router.push('/' + props.id);
    }
    const [columns, setColumns] = useState({
        'to-do': {
          name: 'To Do',
          items: []
        },
        'in-progress': {
          name: 'In Progress',
          items: []
        },
        'done': {
          name: 'Done',
          items: []
        }
      });

      const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const { source, destination } = result;
    
        if (source.droppableId === destination.droppableId) {
          const items = Array.from(columns[source.droppableId].items);
          const [removed] = items.splice(source.index, 1);
          items.splice(destination.index, 0, removed);
    
          setColumns((prev) => ({
            ...prev,
            [source.droppableId]: {
              ...prev[source.droppableId],
              items,
            },
          }));
        } else {
          const sourceItems = Array.from(columns[source.droppableId].items);
          const destItems = Array.from(columns[destination.droppableId].items);
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
    
          setColumns((prev) => ({
            ...prev,
            [source.droppableId]: {
              ...prev[source.droppableId],
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...prev[destination.droppableId],
              items: destItems,
            },
          }));
        }
      };

      return (
        <div className={styles.page}>
          <h1>Project Details</h1>
          <button onClick={navigateToAddTicket} className={styles.addButton}>
            Add Ticket
          </button>
          <div className={styles.dndContainer}>
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.entries(columns).map(([id, column]) => (
                <Droppable key={id} droppableId={id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.column}
                    >
                      <h2>{column.name}</h2>
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={styles.item}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        </div>
      );
    }
    
export default projectDetails;
    

