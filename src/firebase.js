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

const provider = new firebase.auth.GoogleAuthProvider();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName} = user;
    try {
      await userRef.set({
        displayName,
        email,
    
       
        ...additionalData
      }
      );
      

    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const addToFavs = async (user, id) => {
  console.log("user",user)
  console.log("id",id)
  if (!user) return;

  const userRef = firestore.doc(`users/${user.favs}`);
  console.log("hi")
  const snapshot = await userRef.get();
  if (snapshot.exists) {
    console.log("hey")
   // const { id } = id;
    try {
      console.log("hey")
      await userRef.update({
           favs:id
           
      }
      
      )
      .then(console.log("success"));      

    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
 

  return addToFavs(user.favs);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};



