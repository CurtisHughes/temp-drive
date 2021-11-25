import { useAsyncFn } from 'react-use';

import driveStore from '../drive-store';

export const useCreateDrive = () => {
  return useAsyncFn(async () => {
    await driveStore.addDrive();
  });
};
