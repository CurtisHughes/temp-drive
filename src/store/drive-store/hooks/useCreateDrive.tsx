import { useAsyncFn } from 'react-use';

import driveStore from '../drive-store';
import { driveGateway, CreateDriveOptions } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

type UseCreateDriveOptions = {
  onComplete?: () => void;
};

export const useCreateDrive = (callbacks?: UseCreateDriveOptions) =>
  useAsyncFn(async (options: CreateDriveOptions) => {
    const drive = await driveGateway.createDrive(options);
    await driveStore.addDrive(mapGatewayDriveToDrive(drive));
    callbacks?.onComplete && callbacks.onComplete();
  });
