import React, { useState } from 'react';
import Block from './Block';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateBlockState } from '../redux/blocksSlice';
import DataEntryModal from './DataEntryModal';
const Swimlane = ({ lane, blocks }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [droppedBlock, setDroppedBlock] = useState(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'BLOCK',
    drop: (item) => {
      // Check if the block is being dragged from "To Do" to "Done"
      if (item.status === 'To Do' && lane.id === 'Done') {
        alert('You cannot move a task directly from "To Do" to "Done"!');
        return;
      }

      // Prevent moving from "Done" to "To Do" or "In Progress"
      if (item.status === 'Done' && (lane.id === 'To Do' || lane.id === 'In Progress')) {
        alert('You cannot move a task back from "Done" to "To Do" or "In Progress"!');
        return;
      }
      // If it's not "To Do" -> "Done", open the modal for additional data entry
      setDroppedBlock(item);
      setModalOpen(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleModalSubmit = (data) => {
    const newDescription = `${data.info}`; // Append data to description
    dispatch(updateBlockState({ id: droppedBlock.id, newState: lane.id, newDescription }));
    setModalOpen(false); // Close modal after submitting
  };

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightblue' : 'white', padding: '10px', border: '1px solid gray' }}>
      <h3>{lane.name}</h3>
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
      <DataEntryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};
export default Swimlane