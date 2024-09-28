// src/redux/reducers.js
import { MOVE_BLOCK, ADD_BLOCK, VIEW_BLOCK, UPDATE_BLOCK_DATA } from './actions';

const initialState = {
  blocks: [
    { id: '1', title: 'Task 1', status: 'To Do', description: '' },
    { id: '2', title: 'Task 2', status: 'In Progress', description: '' },
    { id: '3', title: 'Task 3', status: 'Done', description: '' },
  ],
  selectedBlockId: null,
};

export const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BLOCK:
      return {
        ...state,
        blocks: [...state.blocks, action.payload],
      };
    case MOVE_BLOCK: {
      const { blockId, targetLane } = action.payload;
      return {
        ...state,
        blocks: state.blocks.map((block) =>
          block.id === blockId ? { ...block, status: targetLane } : block
        ),
      };
    }
    case VIEW_BLOCK:
      return {
        ...state,
        selectedBlockId: action.payload,
      };
    case UPDATE_BLOCK_DATA:
      return {
        ...state,
        blocks: state.blocks.map(block =>
          block.id === action.payload.blockId ? { ...block, ...action.payload.data } : block
        ),
      };
    default:
      return state;
  }
};