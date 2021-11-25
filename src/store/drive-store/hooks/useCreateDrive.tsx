import { useAsyncFn } from 'react-use';

import driveStore from '../drive-store';
import { driveGateway } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

export const useCreateDrive = () =>
  useAsyncFn(async () => {
    const drive = await driveGateway.createDrive();
    await driveStore.addDrive(mapGatewayDriveToDrive(drive));
    return drive;
  });
