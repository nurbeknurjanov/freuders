import { RootStateType } from 'store/store';
import { createSelector } from 'reselect';

export const getPsychologistsStateSelector = (state: RootStateType) =>
  state.psychologists.getPsychologists;

export const getPsychologistsSelector = createSelector(
    getPsychologistsStateSelector,
    psychologistState => {
        return psychologistState.data;
    }
);