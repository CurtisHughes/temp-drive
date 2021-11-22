import { Stack } from '@chakra-ui/react';

import { DriveItem } from './drive-item';
import { useDrives } from '../../store/drives';

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
