import {IPaginationRequest, IPaginationRequestFreuders, ISort} from './table';

export interface RequestParams<
    F extends Record<string, any>,
    S extends ISort<string>,
> {
  pagination: IPaginationRequest;
  filters?: F;
  sort?: S;
}

export interface RequestParamsFreuders<
    F extends Record<string, any>,
    S extends ISort<string>,
> {
  pagination: IPaginationRequestFreuders;
  filters?: F;
  sort?: S;
}
