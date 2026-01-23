import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

let analytics;
let messaging: Messaging | null = null;
let auth: Auth | null = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  auth = getAuth(app);
  
  if ("serviceWorker" in navigator) {
    messaging = getMessaging(app);
  }
}

const googleProvider = new GoogleAuthProvider();

export { 
  app, 
  analytics, 
  messaging, 
  auth,
  getToken, 
  onMessage,
  signInWithPopup,
  googleProvider
};

