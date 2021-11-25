import { DateTime } from 'luxon';

import { Drive } from './types/Drive';
import { generatePassphrase } from './utils/generate-passphrase';

export class DriveGateway {
  public async fetchDriveByName(name: string) {
    return await new Promise<Drive>((resolve) => {
      const dateTime = DateTime.now();
      setTimeout(() => {
        resolve({
          name,
          createdDateTime: dateTime.toUTC().toString(),
        });
      }, 1000);
    });
  }

  public async createDrive() {
    return await new Promise<Drive>((resolve) => {
      const dateTime = DateTime.now();
      setTimeout(() => {
        resolve({
          name: generatePassphrase(),
          createdDateTime: dateTime.toUTC().toString(),
        });
      }, 1000);
    });
  }
}

export default new DriveGateway();
