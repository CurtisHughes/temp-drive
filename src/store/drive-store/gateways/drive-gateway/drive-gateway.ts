import { DateTime } from 'luxon';
import { CreateDriveOptions } from './types/CreateDriveOptions';

import { Drive } from './types/Drive';
import { generatePassphrase } from './utils/generate-passphrase';

export class DriveGateway {
  public async fetchDriveByName(name: string) {
    return await new Promise<Drive>((resolve) => {
      setTimeout(() => {
        resolve({
          name,
          createdDateTime: DateTime.now().toUTC().toString(),
          expirationDateTime: DateTime.now().plus({ minutes: 15 }).toUTC().toString(),
        });
      }, 1000);
    });
  }

  public async createDrive({ passphraseLength, durationInMinutes }: CreateDriveOptions) {
    return await new Promise<Drive>((resolve) => {
      setTimeout(() => {
        resolve({
          name: generatePassphrase(passphraseLength),
          createdDateTime: DateTime.now().toUTC().toString(),
          expirationDateTime: DateTime.now().plus({ minutes: durationInMinutes }).toUTC().toString(),
        });
      }, 1000);
    });
  }
}

export default new DriveGateway();
