// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "project-management-tool-96aa4.firebaseapp.com",
  projectId: "project-management-tool-96aa4",
  storageBucket: "project-management-tool-96aa4.appspot.com",
  messagingSenderId: "1061435883628",
  appId: "1:1061435883628:web:7b8c9f6e42861778b69849",
  measurementId: "G-81QNY5GD7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
x`x`;
