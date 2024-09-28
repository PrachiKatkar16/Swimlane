// /src/components/Block.jsx

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import TaskDescriptionModal from './TaskDescriptionModal';

const Block = ({ block }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlockClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        ref={drag} 
        style={{ 
          opacity: isDragging ? 0.5 : 1, 
          border: '1px solid black', 
          margin: '5px', 
          padding: '10px', 
          cursor: 'move' 
        }}
        onClick={handleBlockClick}
      >
        <h4>{block.title}</h4>
        <p>{block.description}</p>
      </div>
      <TaskDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        block={block}
      />
    </>
  );
};

export default Block;