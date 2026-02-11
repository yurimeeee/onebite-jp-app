import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAiEtJWiWvCghLXVo0mCvNEcC58r_ayEqE",
  authDomain: "onebite-jp.firebaseapp.com",
  projectId: "onebite-jp",
  storageBucket: "onebite-jp.firebasestorage.app",
  messagingSenderId: "795524297087",
  appId: "1:795524297087:ios:5a50c431ce8d3bc4482a4a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

