import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBvloszZgXlgRScYb0RdUzBG-MGKiB4Ntg",
  authDomain: "comment-app-5899f.firebaseapp.com",
  databaseURL: "https://comment-app-5899f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "comment-app-5899f",
  storageBucket: "comment-app-5899f.appspot.com",
  messagingSenderId: "692729793361",
  appId: "1:692729793361:web:f18d5d1312649cd289a170",
  measurementId: "G-FZPYC3VYDL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, app };
