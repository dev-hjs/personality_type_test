import { configureStore } from '@reduxjs/toolkit';
import questionReducer from '../modules/question';
import survey from '../modules/survey';

const store = configureStore({
  reducer: {
    survey: survey
  }
});

export default store;
