// /src/components/Swimlane.jsx

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
      setDroppedBlock(item);
      setModalOpen(true); // Open modal instead of directly updating state
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleModalSubmit = (data) => {
    dispatch(updateBlockState({ id: droppedBlock.id, newState: lane.id, additionalData: data }));
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

export default Swimlane;