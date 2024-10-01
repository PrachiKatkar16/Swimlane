// /src/components/DataEntryModal.jsx

import React, { useState } from 'react';

const DataEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [data, setData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyles}>
      <h2>Data Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="info"
          placeholder="Enter relevant information"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
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

export default DataEntryModal;