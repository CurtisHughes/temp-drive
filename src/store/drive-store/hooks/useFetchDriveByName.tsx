import { useAsyncFn } from 'react-use';

import driveStore from '../drive-store';
import { driveGateway } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

type UseFetchDriveByNameOptions = {
  onComplete?: () => void;
};

export const useFetchDriveByName = (callbacks?: UseFetchDriveByNameOptions) =>
  useAsyncFn(async (name: string) => {
    const drive = await driveGateway.fetchDriveByName(name);
    await driveStore.addDrive(mapGatewayDriveToDrive(drive));
    callbacks?.onComplete && callbacks.onComplete();
  });
