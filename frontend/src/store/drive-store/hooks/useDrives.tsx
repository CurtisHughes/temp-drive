import { useLayoutEffect, useState } from 'react';
import { timer } from 'rxjs';

import { Drive } from '../types/Drive';
import { commit, state } from '../drive-store';
import { REFRESH, RefreshMutation } from '../mutations';

const _clock = timer(0, 1000);

export const useDrives = () => {
  const [drives, setDrives] = useState<Drive[]>([]);

  useLayoutEffect(() => {
    const subscription = state.subscribe(setDrives);

    subscription.add(
      _clock.subscribe(() => {
        commit<RefreshMutation>({ type: REFRESH });
      }),
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return drives;
};
