import { useAsync } from 'react-use';

import { useDrives } from './useDrives';
import driveStore from '../drive-store';

export const useDriveByName = (name: string) => {
  const drives = useDrives();

  const asyncState = useAsync(async () => {
    await driveStore.dispatch('FETCH', name);
  }, [name]);

  return {
    ...asyncState,
    value: drives.find((d) => d.name === name),
  };
};
