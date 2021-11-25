import { DateTime } from 'luxon';

import { Drive } from '../types/Drive';
import { Drive as GatewayDrive } from '../gateways/drive-gateway/types/Drive';
import { calculateTimeLeftInMinutes } from './calculate-time-left-in-minutes';

export const mapGatewayDriveToDrive = (drive: GatewayDrive): Drive => ({
  ...drive,
  timeLeftInMinutes: calculateTimeLeftInMinutes(DateTime.fromISO(drive.createdDateTime)),
});
