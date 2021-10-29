import { getAnalytics, logEvent } from 'firebase/analytics';
import firebase from '../clients/firebase';

const analytics = getAnalytics(firebase);

const dispatcher = <T>(name: string, params?: T) =>
  process.env.NODE_ENV !== 'production'
    ? console.log('Analytic Event:', { name, ...params })
    : logEvent(analytics, name, params);

export default dispatcher;
