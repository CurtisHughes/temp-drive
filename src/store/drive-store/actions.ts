import { CreateDriveOptions } from './gateways';

export const FETCH = 'FETCH';
export type FetchAction = {
  type: typeof FETCH;
  payload: string;
};

export const CREATE = 'CREATE';
export type CreateAction = {
  type: typeof CREATE;
  payload: CreateDriveOptions;
};
