import { createContext } from 'react';
import { Drive } from '../types/Drive';

export type DrivesContextValue = {
  drives: Drive[];
  setDrives: React.Dispatch<React.SetStateAction<Drive[]>>;
};

export const DrivesContext = createContext<DrivesContextValue | undefined>(undefined);

export default DrivesContext;
