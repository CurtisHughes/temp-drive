import { DurationObjectUnits } from 'luxon';
import { Drive as GatewayDrive } from '../gateways/drive-gateway/types/Drive';

export type Drive = GatewayDrive & {
  timeLeft: DurationObjectUnits & {
    percent: number;
  };
};
