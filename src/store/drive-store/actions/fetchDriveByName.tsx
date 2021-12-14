import driveStore from '../drive-store';
import { driveGateway } from '../gateways';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

export const fetchDriveByName = async (name: string) => {
  const drive = await driveGateway.fetchDriveByName(name);
  await driveStore.addDrive(mapGatewayDriveToDrive(drive));
};
