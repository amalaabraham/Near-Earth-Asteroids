import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwI19FdENEqsP-_SF2i6obTdkNDpQizNM",
  authDomain: "asteroids-973db.firebaseapp.com",
  databaseURL: "https://asteroids-973db.firebaseio.com",
  projectId: "asteroids-973db",
  storageBucket: "asteroids-973db.appspot.com",
  messagingSenderId: "1018743778061",
  appId: "1:1018743778061:web:e76825faf21be56ae41e44",
  measurementId: "G-8N3V57DNLC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

