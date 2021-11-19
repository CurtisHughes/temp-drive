import { useState } from 'react';
import { DateTime } from 'luxon';

import DrivesContext from './drives-context';
import { Drive } from '../types/Drive';

export type DrivesContextProviderProps = {};

export const DrivesContextProvider: React.FC<DrivesContextProviderProps> = ({ children }) => {
  const [drives, setDrives] = useState<Drive[]>([
    {
      name: 'passband-loath-rheology-sombrero-resolve',
      createdDateTime: DateTime.local().minus({ minutes: 12 }),
    },
    {
      name: 'bing-savoy-clinic-text-pickaxe',
      createdDateTime: DateTime.local().minus({ minutes: 3 }),
    },
  ]);

  return <DrivesContext.Provider value={{ drives, setDrives }}>{children}</DrivesContext.Provider>;
};

export default DrivesContextProvider;
