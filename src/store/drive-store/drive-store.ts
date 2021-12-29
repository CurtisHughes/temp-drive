import { driveGateway } from './gateways/drive-gateway';
import { createStore } from '../createStore';
import { Drive } from './types/Drive';
import { mapGatewayDriveToDrive } from './utils/mapGatewayDriveToDrive';
import { FETCH, CREATE, FetchAction, CreateAction } from './actions';
import { ADD, AddMutation, REFRESH, REMOVE, RemoveMutation } from './mutations';

const DRIVE_STORE = 'DRIVE_STORE';

const persistentState = window.sessionStorage.getItem(DRIVE_STORE);
const initialState = persistentState ? JSON.parse(persistentState) : [];

export type DriveStoreState = Drive[];

export default createStore<DriveStoreState>({
  state: initialState,
  actions: {
    [FETCH]: async ({ commit }, payload: FetchAction['payload']) => {
      const drive = await driveGateway.fetchDriveByName(payload);
      commit<AddMutation>({ type: ADD, payload: mapGatewayDriveToDrive(drive) });
    },
    [CREATE]: async ({ commit }, payload: CreateAction['payload']) => {
      const drive = await driveGateway.createDrive(payload);
      commit<AddMutation>({ type: ADD, payload: mapGatewayDriveToDrive(drive) });
    },
  },
  mutations: {
    [ADD]: ({ state }, payload: AddMutation['payload']) => {
      return [...state.filter((d) => d.name !== payload.name), payload].sort(
        (a, b) => a.timeLeft.percent - b.timeLeft.percent,
      );
    },
    [REFRESH]: ({ state }) => {
      return state.map((drive) => mapGatewayDriveToDrive(drive)).filter((drive) => drive.timeLeft.percent > 0);
    },
    [REMOVE]: ({ state }, payload: RemoveMutation['payload']) => {
      return state.filter((d) => d.name !== payload.name);
    },
  },
  plugins: [({ state }) => window.sessionStorage.setItem(DRIVE_STORE, JSON.stringify(state))],
});
