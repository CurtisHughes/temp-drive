import { useAsyncFn } from 'react-use';
import { DateTime } from 'luxon';

import { Drive } from '../types/Drive';
import { generatePassphrase } from '../utils/generate-passphrase';
import { useDrivesContext } from './useDrivesContext';

export const useCreateDrive = () => {
  const { setDrives } = useDrivesContext();

  return useAsyncFn(async () => {
    const drive = await new Promise<Drive>((resolve) => {
      setTimeout(() => {
        resolve({
          name: generatePassphrase(),
          createdDateTime: DateTime.now(),
        });
      }, 1000);
    });
    setDrives((drives) => [...drives, drive]);
  });
};
