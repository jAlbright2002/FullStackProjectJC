import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ProjectPage.module.css";

function App() {
  const [columns, setColumns] = useState({});

  useEffect(() => {
    const fetchedTickets = [
      { id: "ticket-1", name: "Dynamic Ticket 1" },
      { id: "ticket-2", name: "Dynamic Ticket 2" },
      { id: "ticket-3", name: "Dynamic Ticket 3" },
    ];

    const initialColumns = {
      "column-1": {
        title: "To-do",
        items: [...fetchedTickets],
      },
      "column-2": {
        title: "In Progress",
        items: [],
      },
      "column-3": {
        title: "Done",
        items: [],
      },
    };

    setColumns(initialColumns);
  }, []);

  const handleDragAndDrop = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    // Reordering within the same column
    if (source.droppableId === destination.droppableId) {
      const updatedItems = Array.from(sourceColumn.items);
      const [movedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: updatedItems },
      });
    } else {
      // Moving between different columns
      const sourceItems = Array.from(sourceColumn.items);
      const destinationItems = Array.from(destinationColumn.items);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destinationColumn, items: destinationItems },
      });
    }
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="column-list">
            {Object.entries(columns).map(([columnId, column]) => (
              <Column key={columnId} columnId={columnId} column={column} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

function Column({ columnId, column }) {
  return (
    <div className="column-container">
      <h3>{column.title}</h3>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className={`items-container ${
              snapshot.isDraggingOver ? "dragging-over" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={`item-container ${
                      snapshot.isDragging ? "dragging" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default App;
