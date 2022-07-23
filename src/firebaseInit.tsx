import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apikey,
  authDomain: process.env.REACT_APP_authdomain,
  projectId: process.env.REACT_APP_projectid,
  storageBucket: process.env.REACT_APP_storagebacket,
  messagingSenderId: process.env.REACT_APP_messagingsenderid,
  appId: process.env.REACT_APP_appid,
  measurementId: process.env.REACT_APP_measurementid,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
