import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDbQJaHHgs9JyNC_YTJQz3FnS4fpuHGKNY",
  authDomain: "zoom-7bea6.firebaseapp.com",
  projectId: "zoom-7bea6",
  storageBucket: "zoom-7bea6.appspot.com",
  messagingSenderId: "305844862407",
  appId: "1:305844862407:web:3056e7eeca5b2a2adcade2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firebaseapp = firebase

