import { AppThunk } from 'store/store';
import { subjects } from 'store';
import { notify } from 'store/common/thunks';

export const getSubjectsThunk = (): AppThunk => async (dispatch, getState) => {
  await dispatch(subjects.getSubjects.thunk.request({}));
  const { error } = subjects.getSubjects.selector.state(getState());
  if (error) {
    dispatch(notify(error.data.message, 'error'));
  }
};
