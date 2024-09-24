import { combineReducers } from '@reduxjs/toolkit';
import { getSubjectsObject } from './slices';

export const subjectsReducer = combineReducers({
  getSubjects: getSubjectsObject.reducer,
});
