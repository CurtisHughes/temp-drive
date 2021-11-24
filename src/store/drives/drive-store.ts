import { DateTime } from 'luxon';
import { Subscription, interval, BehaviorSubject } from 'rxjs';

import { Drive } from './types/Drive';
import { calculateTimeLeftInMinutes } from './utils/calculate-time-left-in-minutes';
import { generatePassphrase } from './utils/generate-passphrase';

export type DriveStoreState = {
  drives: Drive[];
};

export const initialState: DriveStoreState = {
  drives: [],
};

const clock = interval(1000);
const subject = new BehaviorSubject<DriveStoreState>(initialState);
let state = initialState;

const driveStore = {
  subscribe: (setState: React.Dispatch<React.SetStateAction<DriveStoreState>>): Subscription => {
    const driveStoreSubscription: Subscription = subject.subscribe(setState);
    const clockSubscription: Subscription = clock.subscribe(() => {
      state = {
        ...state,
        drives: state.drives
          .map((drive) => ({
            ...drive,
            timeLeftInMinutes: calculateTimeLeftInMinutes(drive.createdDateTime, DateTime.now()),
          }))
          .filter((drive) => drive.timeLeftInMinutes > 0),
      };
      subject.next(state);
    });
    driveStoreSubscription.add(clockSubscription);
    return driveStoreSubscription;
  },
  addDrive: async () => {
    const drive = await new Promise<Drive>((resolve) => {
      const dateTime = DateTime.now();
      setTimeout(() => {
        resolve({
          name: generatePassphrase(),
          createdDateTime: dateTime,
          timeLeftInMinutes: calculateTimeLeftInMinutes(dateTime, dateTime),
        });
      }, 1000);
    });
    state = {
      ...state,
      drives: [...state.drives, drive],
    };
    subject.next(state);
  },
  removeDrive: (drive: Drive) => {
    state = { drives: state.drives.filter((d) => d.name !== drive.name) };
    subject.next(state);
  },
};

export default driveStore;
