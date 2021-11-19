import { useContext } from 'react';
import DrivesContext from '../components/drives-context';

export const useDrivesContext = () => {
  const context = useContext(DrivesContext);
  if (!context) {
    throw new Error('Drives hooks must be used within a DrivesContextProvider');
  }
  return context;
};
