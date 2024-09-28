// /src/components/TaskDescriptionModal.jsx

import React from 'react';

const TaskDescriptionModal = ({ isOpen, onClose, block }) => {
  if (!isOpen || !block) return null;

  return (
    <div style={modalStyles}>
      <h2>{block.title}</h2>
      <p>{block.description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  padding: '20px',
  zIndex: 1000,
  border: '1px solid black',
};

export default TaskDescriptionModal;