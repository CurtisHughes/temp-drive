import { useAsync } from 'react-use';

import { useDrives } from './useDrives';
import { dispatch } from '../drive-store';
import { FETCH, FetchAction } from '../actions';

export const useDriveByName = (name: string) => {
  const drives = useDrives();

  const asyncState = useAsync(async () => {
    await dispatch<FetchAction>({ type: FETCH, payload: name });
  }, [name]);

  return {
    ...asyncState,
    value: drives.find((d) => d.name === name),
  };
};
