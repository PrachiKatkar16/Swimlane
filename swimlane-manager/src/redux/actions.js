// src/redux/actions.js
export const MOVE_BLOCK = 'MOVE_BLOCK';
export const ADD_BLOCK = 'ADD_BLOCK';
export const VIEW_BLOCK = 'VIEW_BLOCK';
export const UPDATE_BLOCK_DATA = 'UPDATE_BLOCK_DATA';

export const moveBlock = (blockId, targetLane) => ({
  type: MOVE_BLOCK,
  payload: {
    blockId,
    targetLane,
  },
});

export const addBlock = (block) => ({
  type: ADD_BLOCK,
  payload: block,
});

export const viewBlock = (blockId) => ({
  type: VIEW_BLOCK,
  payload: blockId,
});

export const updateBlockData = (blockId, data) => ({
  type: UPDATE_BLOCK_DATA,
  payload: { blockId, data },
});