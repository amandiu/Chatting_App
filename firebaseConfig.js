// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUarbng2bfNlpoaGJz10LRd6zs6W5FtMA",
  authDomain: "fir-chatting-2d465.firebaseapp.com",
  projectId: "fir-chatting-2d465",
  storageBucket: "fir-chatting-2d465.appspot.com",
  messagingSenderId: "30885563782",
  appId: "1:30885563782:web:97b1c79255d86e30c9f007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  {app};