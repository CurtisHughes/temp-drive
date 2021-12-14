import { useLayoutEffect, useState } from 'react';
import { useAsync } from 'react-use';

import driveStore, { DriveStoreState } from '../drive-store';
import { fetchDriveByName } from '../actions';

export const useDriveByName = (name: string) => {
  const [{ drives }, setState] = useState<DriveStoreState>(driveStore.state);

  const asyncState = useAsync(async () => {
    await fetchDriveByName(name);
  }, [name]);

  useLayoutEffect(() => {
    const subscription = driveStore.subscribe(setState);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    ...asyncState,
    value: drives.find((d) => d.name === name),
  };
};
