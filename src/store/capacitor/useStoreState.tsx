import { useLayoutEffect, useState } from 'react';

import { Store } from '../createStore';

export function useStoreState<T>({ state }: Store<T>) {
  const [storeState, setStoreState] = useState<T>();

  useLayoutEffect(() => {
    const subscription = state.subscribe(setStoreState);
    return () => {
      subscription.unsubscribe();
    };
  }, [state]);

  return storeState;
}
