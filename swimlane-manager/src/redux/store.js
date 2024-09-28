import { configureStore } from '@reduxjs/toolkit';
import blocksReducer from './blocksSlice';

const store = configureStore({
  reducer: {
    blocks: blocksReducer,
  },
});

export default store;