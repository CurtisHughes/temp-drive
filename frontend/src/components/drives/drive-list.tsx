import { Stack } from '@chakra-ui/react';

import { useDrives } from '../../store/drive-store/hooks/useDrives';
import { DriveItem } from './drive-item';

export const DriveList = () => {
  const drives = useDrives();

  return (
    <Stack as="ul" my="7" gridGap="7">
      {drives.map((drive) => (
        <DriveItem key={drive.name} drive={drive} />
      ))}
    </Stack>
  );
};

export default DriveList;
