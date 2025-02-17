// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"; // Change from 'lite' to full firestore
import { getStorage} from "firebase/storage"; // Change from 'lite' to full firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGdyoU3laskvBVZmLD5qQeaoixZc99L2Y",
  authDomain: "daansethu.firebaseapp.com",
  projectId: "daansethu",
  storageBucket: "daansethu.appspot.com",
  messagingSenderId: "336666244159",
  // appId: "1:336666244159:web:654c2a949b22729e66f48a",
  // measurementId: "G-XNW9NLMGL8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
