import { DateTime } from 'luxon';

import { Drive } from '../types/Drive';
import { Drive as GatewayDrive } from '../gateways/drive-gateway/types/Drive';

export const mapGatewayDriveToDrive = (drive: GatewayDrive): Drive => {
  const createdDateTime = DateTime.fromISO(drive.createdDateTime).toUTC();
  const expirationDateTime = DateTime.fromISO(drive.expirationDateTime).toUTC();

  const timeLeftInMinutes = expirationDateTime.diffNow('minutes').minutes;
  const timeLeftInPercent = (timeLeftInMinutes / expirationDateTime.diff(createdDateTime, 'minutes').minutes) * 100;

  return {
    ...drive,
    timeLeftInMinutes,
    timeLeftInPercent,
  };
};
