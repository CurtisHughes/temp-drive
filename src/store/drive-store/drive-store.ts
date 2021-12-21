import { driveGateway } from './gateways/drive-gateway';
import { createStore } from '../createStore';
import { Drive } from './types/Drive';
import { mapGatewayDriveToDrive } from './utils/mapGatewayDriveToDrive';

const DRIVE_STORE = 'DRIVE_STORE';

const persistentState = window.sessionStorage.getItem(DRIVE_STORE);
const initialState = persistentState ? JSON.parse(persistentState) : [];

export default createStore<Drive[]>({
  state: initialState,
  mutations: {
    ADD: (state: Array<Drive>, value: Drive) => {
      return [...state.filter((d) => d.name !== value.name), value].sort(
        (a, b) => a.timeLeft.percent - b.timeLeft.percent,
      );
    },
    REFRESH: (state: Array<Drive>) => {
      return state.map((drive) => mapGatewayDriveToDrive(drive)).filter((drive) => drive.timeLeft.percent > 0);
    },
    REMOVE: (state: Array<Drive>, value: Drive) => {
      return state.filter((d) => d.name !== value.name);
    },
  },
  actions: {
    FETCH: async ({ commit }, payload) => {
      const drive = await driveGateway.fetchDriveByName(payload);
      commit('ADD', mapGatewayDriveToDrive(drive));
    },
    CREATE: async ({ commit }, payload) => {
      const drive = await driveGateway.createDrive(payload);
      commit('ADD', mapGatewayDriveToDrive(drive));
    },
  },
  plugins: [({ state }) => window.sessionStorage.setItem(DRIVE_STORE, JSON.stringify(state))],
});
