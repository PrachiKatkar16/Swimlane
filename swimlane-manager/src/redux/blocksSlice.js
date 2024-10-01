import { createSlice } from '@reduxjs/toolkit';

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    blocks: [
      { id: '1', title: 'Task 1', status: 'To Do', description: '' },
      { id: '2', title: 'Task 2', status: 'In Progress', description: '' },
      { id: '3', title: 'Task 3', status: 'Done', description: '' },
    ],
  },
  reducers: {
    updateBlockState: (state, action) => {
      const { id, newState, newDescription } = action.payload;
      const block = state.blocks.find(block => block.id === id);
      if (block) {
        block.status = newState;
        block.description = newDescription; // Update description
      }
    },
    // Other reducers...
  },
});

export const { updateBlockState } = blocksSlice.actions;
export default blocksSlice.reducer;