import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import { IFileFilters, IFileSort, IFileSortFields } from 'api/filesApi';
import { AppThunk } from 'store/store';
import { files } from 'store';
import { notify } from 'store/common/thunks';

export const getFilesThunk =
  (
    pagination: IPaginationRequest,
    filters: IFileFilters,
    sorting: GridSortModel
  ): AppThunk =>
  async (dispatch, getState) => {
    const sort: IFileSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IFileSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    await dispatch(
      files.getFiles.thunk.request({
        query: {
          pagination,
          filters,
          sort,
        },
      })
    );
    const { error } = files.getFiles.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }
  };
