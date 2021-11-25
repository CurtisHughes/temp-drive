import { useAsync } from 'react-use';

import driveStore from '../drive-store';
import { driveGateway } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';
import { useDrives } from './useDrives';

export const useDriveByName = (name: string) => {
  const drives = useDrives();

  return useAsync(async () => {
    let drive = drives.find((drive) => drive.name === name);

    if (!drive) {
      console.log(`fetching drive(${name})...`);
      const drive = await driveGateway.fetchDriveByName(name);
      await driveStore.addDrive(mapGatewayDriveToDrive(drive));
    }

    return drive;
  }, [drives]);
};
