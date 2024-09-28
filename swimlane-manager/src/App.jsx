// src/App.jsx
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Swimlane from './components/Swimlane';
import { moveBlock } from './redux/actions';

const App = () => {
  const blocks = useSelector((state) => state.blocks.blocks);
  const dispatch = useDispatch();

  // Define movement rules as a state variable for easy configuration
  const movementRules = {
    'To Do': ['In Progress'],
    'In Progress': ['To Do', 'Done'],
    'Done': ['In Progress'],
  };

  const handleDrop = (targetLane, draggedBlock) => {
    const sourceLane = draggedBlock.status;

    // Check if the move is allowed based on the movement rules
    if (movementRules[sourceLane]?.includes(targetLane)) {
      dispatch(moveBlock(draggedBlock.id, targetLane));
    } else {
      alert('Movement not allowed based on rules!');
    }
  };

  return (
    <div>
      <h1>Swimlane UI</h1>
      {['To Do', 'In Progress', 'Done'].map((lane) => (
        <Swimlane
          key={lane}
          lane={{ id: lane, name: lane }}
          blocks={blocks.filter((block) => block.status === lane)}
          onDrop={(draggedBlock) => handleDrop(lane, draggedBlock)}
        />
      ))}
    </div>
  );
};

const MainApp = () => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);

export default MainApp;