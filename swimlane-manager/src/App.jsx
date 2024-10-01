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

  // Define movement rules to restrict task transitions
  const movementRules = {
    'To Do': ['In Progress'],         // Can only move to 'In Progress'
    'In Progress': ['To Do', 'Done'], // Can move to 'To Do' or 'Done'
    'Done': [],                       // Cannot move anywhere once in 'Done'
  };

  const handleDrop = (targetLane, draggedBlock) => {
    const sourceLane = draggedBlock.status;

    // Check for "To Do" -> "Done" invalid move and show an alert
    if (sourceLane === 'To Do' && targetLane === 'Done') {
      alert('You cannot move a task directly from "To Do" to "Done"!');
      return;
    }

    // Check if the move is allowed based on the movement rules
    if (movementRules[sourceLane]?.includes(targetLane)) {
      dispatch(moveBlock(draggedBlock.id, targetLane));
    } else {
      alert('Movement not allowed based on the rules!');
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