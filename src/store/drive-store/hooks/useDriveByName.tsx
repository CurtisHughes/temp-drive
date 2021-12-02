import { useLayoutEffect, useState } from 'react';
import { useAsync } from 'react-use';

import driveStore, { DriveStoreState } from '../drive-store';
import { driveGateway } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

export const useDriveByName = (name: string) => {
  const [{ drives }, setState] = useState<DriveStoreState>(driveStore.state);

  const asyncState = useAsync(async () => {
    const drive = await driveGateway.fetchDriveByName(name);
    await driveStore.addDrive(mapGatewayDriveToDrive(drive));
  }, []);

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
