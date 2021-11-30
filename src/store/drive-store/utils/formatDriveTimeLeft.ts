import { Drive } from '../types/Drive';

export const formatDriveTimeLeft = (drive: Drive) =>
  `${drive.timeLeft.hours} hours ${drive.timeLeft.minutes} minutes ${Math.round(
    drive.timeLeft.seconds || 0,
  )} seconds left`;
