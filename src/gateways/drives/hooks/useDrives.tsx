import { useDrivesContext } from './useDrivesContext';

export const useDrives = () => {
  const { drives } = useDrivesContext();
  return drives;
};
