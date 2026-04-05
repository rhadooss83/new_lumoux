/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCzzyGilyxFh55pcGMWE8almKMXsVViKVg",
  authDomain: "lumoux.firebaseapp.com",
  projectId: "lumoux",
  storageBucket: "lumoux.firebasestorage.app",
  messagingSenderId: "799693512555",
  appId: "1:799693512555:web:1c7004c9bbdc02ea2cf62e",
  measurementId: "G-T9BZC2Q62J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
