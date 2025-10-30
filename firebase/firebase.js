// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCoRYMi7jwC6zRyEzeV3MmVIFTdqsZE7eM",
    authDomain: "animetracker-2dc38.firebaseapp.com",
    projectId: "animetracker-2dc38",
    storageBucket: "animetracker-2dc38.firebasestorage.app",
    messagingSenderId: "586514950285",
    appId: "1:586514950285:web:4ef0c7e196fe83bb6cdac4",
    measurementId: "G-8KRG5SVJVV"
  };
//   await setDoc(doc(db, 'users', user.uid), {
//     username: username || email.split('@')[0],
//     email: email,
//   });;
  
// Prevent reinitializing if already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app};
