import { DateTime } from 'luxon';
import { CreateDriveOptions } from './types/CreateDriveOptions';

import { Drive } from './types/Drive';
import { generatePassphrase } from './utils/generate-passphrase';

export class DriveGateway {
  public async fetchDriveByName(name: string) {
    return await new Promise<Drive>((resolve) => {
      setTimeout(() => {
        const serializedCachedState = window.sessionStorage.getItem('DRIVE_STORE');
        const state = serializedCachedState ? JSON.parse(serializedCachedState) : { drives: [] };
        const drive = state.drives.find((s: Drive) => s.name === name);

        if (drive) {
          resolve(drive);
        } else {
          resolve({
            name,
            files: [
              { id: '1', name: `${generatePassphrase(1)}.png`, size: '1 GB' },
              { id: '2', name: `${generatePassphrase(1)}.png`, size: '1 KB' },
            ],
            createdDateTime: DateTime.now().toUTC().toString(),
            expirationDateTime: DateTime.now().plus({ minutes: 15 }).toUTC().toString(),
          });
        }
      }, 1000);
    });
  }

  public async createDrive({ passphraseLength, durationInMinutes }: CreateDriveOptions) {
    return await new Promise<Drive>((resolve) => {
      setTimeout(() => {
        resolve({
          name: generatePassphrase(passphraseLength),
          files: [],
          createdDateTime: DateTime.now().toUTC().toString(),
          expirationDateTime: DateTime.now().plus({ minutes: durationInMinutes }).toUTC().toString(),
        });
      }, 1000);
    });
  }
}

export default new DriveGateway();
