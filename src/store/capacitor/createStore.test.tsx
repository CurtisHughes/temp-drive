import { createStore } from './createStore';

test('renders learn react link', async () => {
  const plugin = jest.fn();

  const store = createStore<Array<string>>({
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
    plugins: [plugin],
  });
  store.commit('ADD', 'curtis');
  store.commit('ADD', 'karen');
  await store.dispatch('CREATE', 'curtis');
  expect(store.subject.value).toEqual(['curtis', 'karen', 'curtis']);
  expect(plugin).toHaveBeenCalledTimes(4);
});
