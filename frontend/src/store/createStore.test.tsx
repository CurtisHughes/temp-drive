import { ActionContext, createStore, MutationContext, StoreProps } from './createStore';

describe('createStore', () => {
  let params: StoreProps<any>;

  beforeEach(() => {
    params = {
      state: [],
      mutations: {
        ADD: ({ state }: MutationContext, payload: string): Array<string> => {
          return [...state, payload];
        },
      },
      actions: {
        CREATE: async ({ commit }: ActionContext, payload) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              commit({ type: 'ADD', payload });
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
      store.commit({ type: 'ADD', payload: 'curtis' });

      expect(store.state.getValue()).toEqual(['curtis']);
    });

    test('updates the store when dispatching an action', async () => {
      const store = createStore(params);
      await store.dispatch({ type: 'CREATE', payload: 'curtis' });

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

      store.commit({ type: 'ADD', payload: 'curtis' });
      store.commit({ type: 'ADD', payload: 'karen' });
      await store.dispatch({ type: 'CREATE', payload: 'curtis' });

      expect(plugin).toHaveBeenCalledTimes(3);
    });

    test('passes the mutation type and payload to the plugin', async () => {
      const plugin = jest.fn();
      const store = createStore({
        ...params,
        plugins: [plugin],
      });
      await store.dispatch({ type: 'CREATE', payload: 'curtis' });

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
