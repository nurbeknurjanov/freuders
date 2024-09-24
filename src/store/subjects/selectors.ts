import { RootStateType } from 'store/store';
import { createSelector } from 'reselect';

export const getSubjectsStateSelector = (state: RootStateType) =>
  state.subjects.getSubjects;

export const getSubjectsSelector = createSelector(
  getSubjectsStateSelector,
  subjectState => {
    return subjectState.data;
  }
);
