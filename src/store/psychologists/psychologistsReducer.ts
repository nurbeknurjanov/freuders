import {combineReducers} from '@reduxjs/toolkit';
import {
    getPsychologistsObject
} from './slices';

export const psychologistsReducer = combineReducers({
    getPsychologists: getPsychologistsObject.reducer,
});
