import { DateTime } from 'luxon';
import { interval, Subscription } from 'rxjs';

import { BehaviorSubjectStore } from '../behavior-subject-store';
import { calculateTimeLeftInMinutes } from './utils/calculate-time-left-in-minutes';
import { Drive } from './types/Drive';

export type DriveStoreState = {
  drives: Drive[];
};

export class DriveStore extends BehaviorSubjectStore<DriveStoreState> {
  private _clock = interval(1000);

  public subscribe(setState: React.Dispatch<React.SetStateAction<DriveStoreState>>) {
    const driveStoreSubscription: Subscription = this.subject.subscribe(setState);
    const clockSubscription: Subscription = this._clock.subscribe(() => {
      this.state = {
        ...this.state,
        drives: this.state.drives
          .map((drive) => ({
            ...drive,
            timeLeftInMinutes: calculateTimeLeftInMinutes(DateTime.fromISO(drive.createdDateTime), DateTime.now()),
          }))
          .filter((drive) => drive.timeLeftInMinutes > 0),
      };
    });
    driveStoreSubscription.add(clockSubscription);
    return driveStoreSubscription;
  }

  public async addDrive(drive: Drive) {
    this.state = {
      ...this.state,
      drives: [...this.state.drives, drive].filter(
        (drive, index, self) => self.findIndex((d) => d.name === drive.name) === index,
      ),
    };
  }

  public async removeDrive(drive: Drive) {
    this.state = { drives: this.state.drives.filter((d) => d.name !== drive.name) };
  }
}

export default new DriveStore({
  defaultState: {
    drives: [],
  },
  cache: {
    key: 'DRIVE_STORE',
    client: window.sessionStorage,
  },
});
