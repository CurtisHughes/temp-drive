import { Subscription, timer } from 'rxjs';

import { BehaviorSubjectStore } from '../behavior-subject-store';
import { Drive } from './types/Drive';
import { mapGatewayDriveToDrive } from './utils/mapGatewayDriveToDrive';

export type DriveStoreState = {
  drives: Drive[];
};

export class DriveStore extends BehaviorSubjectStore<DriveStoreState> {
  private _clock = timer(0, 1000);

  public subscribe(setState: React.Dispatch<React.SetStateAction<DriveStoreState>>) {
    const driveStoreSubscription: Subscription = this.subject.subscribe(setState);
    const clockSubscription: Subscription = this._clock.subscribe(() => {
      this.state = {
        ...this.state,
        drives: this.state.drives
          .map((drive) => mapGatewayDriveToDrive(drive))
          .filter((drive) => drive.timeLeft.percent > 0),
      };
    });
    driveStoreSubscription.add(clockSubscription);
    return driveStoreSubscription;
  }

  public async addDrive(drive: Drive) {
    this.state = {
      ...this.state,
      drives: [...this.state.drives.filter((d) => d.name !== drive.name), drive],
    };
  }

  public removeDrive(drive: Drive) {
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
