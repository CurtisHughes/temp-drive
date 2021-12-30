import { File } from './File';

export type Drive = {
  name: string;
  files: File[];
  createdDateTime: string;
  expirationDateTime: string;
};
