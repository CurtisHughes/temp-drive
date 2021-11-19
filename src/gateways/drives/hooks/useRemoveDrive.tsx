import { useAsyncFn } from 'react-use';

import { Drive } from '../types/Drive';
import { useDrivesContext } from './useDrivesContext';

export const useRemoveDrive = () => {
  const { setDrives } = useDrivesContext();

  return useAsyncFn(async (drive: Drive) => {
    const deletedDrive = await new Promise<Drive>((resolve) => {
      setTimeout(() => {
        resolve(drive);
      }, 1000);
    });
    setDrives((drives) => drives.filter((d) => d.name === deletedDrive.name));
  });
};
