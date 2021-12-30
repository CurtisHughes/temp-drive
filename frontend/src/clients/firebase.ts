import { initializeApp, FirebaseApp } from 'firebase/app';

const client: FirebaseApp = initializeApp({
  apiKey: 'AIzaSyD_73v5Ds8QNLNMYYZ5orPM6yTCAHBBqOE',
  authDomain: 'temp-drive.firebaseapp.com',
  projectId: 'temp-drive',
  storageBucket: 'temp-drive.appspot.com',
  messagingSenderId: '253913684530',
  appId: '1:253913684530:web:8dde38b67708a22f307a2b',
  measurementId: 'G-TLKTKF29X2',
});

export default client;
