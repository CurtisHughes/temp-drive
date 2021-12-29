import { useLayoutEffect, useState } from 'react';
import { timer } from 'rxjs';

import { Drive } from '../types/Drive';
import driveStore from '../drive-store';
import { REFRESH, RefreshMutation } from '../mutations';

const _clock = timer(0, 1000);

export const useDrives = () => {
  const [drives, setDrives] = useState<Drive[]>([]);

  useLayoutEffect(() => {
    const subscription = driveStore.state.subscribe(setDrives);

    subscription.add(
      _clock.subscribe(() => {
        driveStore.commit<RefreshMutation>({ type: REFRESH });
      }),
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return drives;
};
