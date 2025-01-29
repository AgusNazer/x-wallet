// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Usa import.meta.env, NO process.env

   authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_PROD,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID,
   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  }

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app)
// export const sotrageRef = ref(storage)

