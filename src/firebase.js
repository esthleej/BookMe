import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import dotenv from 'dotenv';
dotenv.config();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
export const signUpUserWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password);
};
export const sendPasswordResetEmail = (email) => {
  auth.sendPasswordResetEmail(email);
};

export default firebase;
