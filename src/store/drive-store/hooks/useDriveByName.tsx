import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import { Subscription } from 'rxjs';

import driveStore, { DriveStoreState } from '../drive-store';
import { driveGateway } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

export const useDriveByName = (name: string) => {
  const [{ drives }, setState] = useState<DriveStoreState>(driveStore.state);
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => () => subscription?.unsubscribe(), [subscription]);

  const asyncState = useAsync(async () => {
    let drive = driveStore.state.drives.find((d) => d.name === name);

    if (!drive) {
      const drive = await driveGateway.fetchDriveByName(name);
      await driveStore.addDrive(mapGatewayDriveToDrive(drive));
    }

    const subscription = driveStore.subscribe(setState);
    setSubscription(subscription);
  }, []);

  return {
    ...asyncState,
    value: drives.find((d) => d.name === name),
  };
};
