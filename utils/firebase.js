// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnwjjvh5sI6esDq9lefsAU1c9Q6g_1INM",
  authDomain: "aplus-tools.firebaseapp.com",
  projectId: "aplus-tools",
  storageBucket: "aplus-tools.appspot.com",
  messagingSenderId: "406752958384",
  appId: "1:406752958384:web:c911bbf6350f205ab62875",
  measurementId: "G-JY19NFJBM4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);