import { configureStore } from '@reduxjs/toolkit';
import questionReducer from '../modules/Question';

const store = configureStore({
  reducer: {
    question: questionReducer
  }
});

export default store;
