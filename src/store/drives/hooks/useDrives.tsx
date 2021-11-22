import { useLayoutEffect, useState } from 'react';

import driveStore, { DriveStoreState, initialState } from '../drive-store';

export const useDrives = () => {
  const [{ drives }, setDrives] = useState<DriveStoreState>(initialState);

  useLayoutEffect(() => {
    const subscription = driveStore.subscribe(setDrives);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return drives;
};
