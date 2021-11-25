import { useAsyncFn } from 'react-use';

import driveStore from '../drive-store';
import driveGateway from '../gateways/drive-gateway';

export const useCreateDrive = () =>
  useAsyncFn(async () => {
    const drive = await driveGateway.createDrive();
    await driveStore.addDrive(drive);
    return drive;
  });
