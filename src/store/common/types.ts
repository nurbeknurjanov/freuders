export interface ResponseState {
  isFetching: boolean;
  isFetched: boolean;
  fetchedTime: null | number;
}

export interface MergeResponseState<D, E> extends ResponseState {
  data: null | D;
  error: null | E;
}

export const getInitialResponseState = (): ResponseState => ({
  isFetching: false,
  isFetched: false,
  fetchedTime: null,
});

export const getFetchedResponseState = (): ResponseState => ({
  isFetching: false,
  isFetched: true,
  fetchedTime: Date.now(),
});

export const getFetchingResponseState = (): Pick<
  ResponseState,
  'isFetching'
> => ({
  isFetching: true,
});

type PartialState = {
  [key: string]: any;
  isFetching: boolean;
  isFetched: boolean;
  error: any;
  fetchedTime: null | number;
};

export const getAggStatesFetching = (...states: PartialState[]): boolean => {
  return states.some(state => state.isFetching);
};
export const getAggStatesFetched = (...states: PartialState[]): boolean => {
  return states.every(state => state.isFetched);
};
export const getAggStatesFirstFetched = (
  ...states: PartialState[]
): boolean => {
  return states.some(state => state.isFetched);
};
export const getAggStatesError = (...states: PartialState[]): any => {
  return states.find(state => state.error)?.error;
};
export const getAggStatesFirstFetching = (
  ...states: PartialState[]
): boolean => {
  return states.some(state => state.isFetching && !state.fetchedTime);
};
export const getAggStates = (...states: PartialState[]) => {
  return {
    isFetching: getAggStatesFetching(...states),
    isFetched: getAggStatesFetched(...states),
    error: getAggStatesError(...states),
    firstFetching: getAggStatesFirstFetching(...states),
  };
};
