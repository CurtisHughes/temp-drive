import { Drive } from './types/Drive';

export const ADD = 'ADD';
export type AddMutation = {
  type: typeof ADD;
  payload: Drive;
};

export const REFRESH = 'REFRESH';
export type RefreshMutation = {
  type: typeof REFRESH;
};

export const REMOVE = 'REMOVE';
export type RemoveMutation = {
  type: typeof REMOVE;
  payload: Drive;
};
