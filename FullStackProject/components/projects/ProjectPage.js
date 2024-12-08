import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ProjectPage.module.css";


// we want to remove this and make it so that we dont use const data but we use the ticket s we created
// Static data for items
const data = [
  { id: "item-1", name: "Item 1" },
  { id: "item-2", name: "Item 2" },
  { id: "item-3", name: "Item 3" },
];

// Static columns
const columnsFromBackend = {
  "column-1": {
    title: "To-do",
    items: [...data],
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

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  const handleDragAndDrop = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    // If it's a column move
    if (type === "column") {
      const reorderedColumns = Array.from(Object.entries(columns));
      const [removedColumn] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, removedColumn);

      const newColumns = Object.fromEntries(reorderedColumns);
      setColumns(newColumns);
      return;
    }

    // If it's an item move within the same column
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const sourceItems = Array.from(sourceColumn.items);
    const destinationItems = Array.from(destinationColumn.items);

    const [movedItem] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, movedItem);

    const newColumns = {
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destinationColumn, items: destinationItems },
    };

    setColumns(newColumns);
  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          {/* Droppable for Columns (Horizontal Drag) */}
          <Droppable droppableId="ROOT" type="column" direction="vertical">
            {(provided) => (
              <div
                className="column-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Object.entries(columns).map(([columnId, column], index) => (
                  <Draggable
                    draggableId={columnId}
                    index={index}
                    key={columnId}
                  >
                    {(provided) => (
                      <div
                        className="column-item"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Column {...column} id={columnId} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

function Column({ title, items, id }) {
  return (
    <div className="column-container">
      <h3>{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="items-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
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
