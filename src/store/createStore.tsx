import { BehaviorSubject, Subject } from 'rxjs';

export type Context<S> = {
  state: S;
  commit: (mutation: string, payload: any) => void;
};

export type Plugin<S> = (state: S) => void;

export type Action<S> = (context: Context<S>, payload: any) => Promise<void> | void;

export type Mutation<S> = (state: S, payload?: any) => S;

export type StoreProps<S> = {
  state: S;
  actions: Record<string, Action<S>>;
  mutations: Record<string, Mutation<S>>;
  plugins: Plugin<{ mutation: { type: string; payload: any }; state: S }>[];
};

export type Store<T> = {
  state: BehaviorSubject<T>;
  dispatch: (action: string, payload?: any) => Promise<void>;
  commit: (type: string, payload?: any) => void;
};

export function createStore<S>({ state, actions, mutations, plugins }: StoreProps<S>): Store<S> {
  const stateSubject: BehaviorSubject<S> = new BehaviorSubject(state);
  const commitSubject: Subject<{ mutation: { type: string; payload: any }; state: S }> = new Subject();

  const commit = (type: string, payload?: any) => {
    const state = mutations[type](stateSubject.value, payload);
    commitSubject.next({
      state,
      mutation: {
        type,
        payload,
      },
    });
  };

  const dispatch = async (action: string, payload?: any) => {
    return await actions[action]({ commit, state: stateSubject.value }, payload);
  };

  commitSubject.subscribe(({ state }) => stateSubject.next(state));
  plugins.forEach((plugin) => commitSubject.subscribe(plugin));

  return {
    state: stateSubject,
    dispatch,
    commit,
  };
}
