import { useLayoutEffect, useState } from 'react';

import driveStore, { DriveStoreState, defaultState } from '../drive-store';

export const useDrives = () => {
  const [{ drives }, setDrives] = useState<DriveStoreState>(defaultState);

  useLayoutEffect(() => {
    const subscription = driveStore.subscribe(setDrives);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return drives;
};
