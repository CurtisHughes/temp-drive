import { useDrives } from './useDrives';

export const useDriveByName = (name: string) => {
  const drives = useDrives();

  return drives.find((drive) => drive.name === name);
};
