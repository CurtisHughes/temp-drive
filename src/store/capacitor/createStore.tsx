import { BehaviorSubject, Subscription } from 'rxjs';

export type Context<S> = {
  state: S;
  commit: (mutation: string, payload: any) => void;
};

export type Plugin<S> = (state: S) => void;

export type Action<S> = (context: Context<S>, payload: any) => Promise<void> | void;

export type Mutation<S> = (state: S, payload: any) => S;

export type Store<S> = {
  state: S;
  actions: Record<string, Action<S>>;
  mutations: Record<string, Mutation<S>>;
  plugins: Plugin<S>[];
};

export function createStore<S>({ state, actions, mutations, plugins }: Store<S>) {
  const subject: BehaviorSubject<S> = new BehaviorSubject(state);

  const destroy = plugins.reduce((acc: Subscription | null, plugin) => {
    if (!acc) {
      acc = subject.subscribe(plugin);
    } else {
      acc.add(subject.subscribe(plugin));
    }
    return acc;
  }, null);

  const commit = (mutation: string, payload: any) => {
    const value = mutations[mutation](subject.value, payload);
    subject.next(value);
  };

  const dispatch = async (action: string, payload: any) => {
    return await actions[action]({ commit, state: subject.value }, payload);
  };

  return {
    subject,
    subscribe: subject.subscribe,
    destroy,
    dispatch,
    commit,
    // useState?
  };
}
