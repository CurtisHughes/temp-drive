import { createStore, StoreProps } from './createStore';

describe('createStore', () => {
  let params: StoreProps<any>;

  beforeEach(() => {
    params = {
      state: [],
      mutations: {
        ADD: (state: Array<string>, value: string): Array<string> => {
          return [...state, value];
        },
      },
      actions: {
        CREATE: async ({ commit }, payload) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              commit('ADD', payload);
              resolve();
            }, 2000);
          });
        },
      },
      plugins: [],
    };
  });

  describe('store', () => {
    test('updates the store when committing a mutation', async () => {
      const store = createStore(params);
      store.commit('ADD', 'curtis');

      expect(store.state.getValue()).toEqual(['curtis']);
    });

    test('updates the store when dispatching an action', async () => {
      const store = createStore(params);
      await store.dispatch('CREATE', 'curtis');

      expect(store.state.getValue()).toEqual(['curtis']);
    });
  });

  describe('plugins', () => {
    test('calls the plugin for every mutation', async () => {
      const plugin = jest.fn();
      const store = createStore({
        ...params,
        plugins: [plugin],
      });

      store.commit('ADD', 'curtis');
      store.commit('ADD', 'karen');
      await store.dispatch('CREATE', 'curtis');

      expect(plugin).toHaveBeenCalledTimes(3);
    });

    test('passes the mutation type and payload to the plugin', async () => {
      const plugin = jest.fn();
      const store = createStore({
        ...params,
        plugins: [plugin],
      });
      await store.dispatch('CREATE', 'curtis');

      expect(plugin).toHaveBeenCalledWith({
        state: ['curtis'],
        mutation: {
          type: 'ADD',
          payload: 'curtis',
        },
      });
    });
  });
});
