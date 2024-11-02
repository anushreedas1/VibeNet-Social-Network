import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2clAldMbeC8nh24rk_AbXVnat9KIXKXc",
  authDomain: "social-media-2382d.firebaseapp.com",
  projectId: "social-media-2382d",
  storageBucket: "social-media-2382d.appspot.com",
  messagingSenderId: "90412511312",
  appId: "1:90412511312:web:2fdb7bd2918d46c3ce6155",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
