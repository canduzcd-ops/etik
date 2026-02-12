import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getRedirectResult,
  type User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0pZaW_wwqGjBZev6LlNO51tsBHM-6l3Y",
  authDomain: "etik-de7f8.firebaseapp.com",
  projectId: "etik-de7f8",
  storageBucket: "etik-de7f8.firebasestorage.app",
  messagingSenderId: "784111522835",
  appId: "1:784111522835:web:46e146dee42e356a689be6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getRedirectResult,
  type User
};
