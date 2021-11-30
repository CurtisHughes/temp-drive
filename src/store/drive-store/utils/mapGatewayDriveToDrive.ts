import { DateTime } from 'luxon';

import { Drive } from '../types/Drive';
import { Drive as GatewayDrive } from '../gateways/drive-gateway/types/Drive';

export const mapGatewayDriveToDrive = (drive: GatewayDrive): Drive => {
  const createdDateTime = DateTime.fromISO(drive.createdDateTime).toUTC();
  const expirationDateTime = DateTime.fromISO(drive.expirationDateTime).toUTC();

  const timeLeft = expirationDateTime.diffNow(['hours', 'minutes', 'seconds']);
  const timeLeftInPercent =
    (timeLeft.as('seconds') / expirationDateTime.diff(createdDateTime, 'seconds').seconds) * 100;

  return {
    ...drive,
    timeLeft: {
      ...timeLeft.toObject(),
      percent: timeLeftInPercent,
    },
  };
};
