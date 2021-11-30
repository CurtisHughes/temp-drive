import { Drive as GatewayDrive } from '../gateways/drive-gateway/types/Drive';

export type Drive = GatewayDrive & {
  timeLeftInMinutes: number;
  timeLeftInPercent: number;
};
