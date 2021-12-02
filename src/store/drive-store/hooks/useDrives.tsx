import { useLayoutEffect, useState } from 'react';

import driveStore, { DriveStoreState } from '../drive-store';

export const useDrives = () => {
  const [{ drives }, setDrives] = useState<DriveStoreState>(driveStore.state);

  useLayoutEffect(() => {
    const subscription = driveStore.subscribe(setDrives);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return drives;
};
