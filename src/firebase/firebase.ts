// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIjq6P37kQLxZTLbnluLB_caL8bILw64M",
  authDomain: "dashboard-sismos-68d7a.firebaseapp.com",
  databaseURL: "https://dashboard-sismos-68d7a-default-rtdb.firebaseio.com",
  projectId: "dashboard-sismos-68d7a",
  storageBucket: "dashboard-sismos-68d7a.firebasestorage.app",
  messagingSenderId: "700286241098",
  appId: "1:700286241098:web:07ad2bfc6189eec8bb99b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);