import driveStore from '../drive-store';
import { driveGateway, CreateDriveOptions } from '../gateways/drive-gateway';
import { mapGatewayDriveToDrive } from '../utils/mapGatewayDriveToDrive';

export const createDrive = async (options: CreateDriveOptions) => {
  const drive = await driveGateway.createDrive(options);
  await driveStore.addDrive(mapGatewayDriveToDrive(drive));
};
