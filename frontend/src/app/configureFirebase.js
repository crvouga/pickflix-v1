import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIofrqn7PtsKeVyDLi9yyvSwz1oylDVFo",
  authDomain: "pickflix.firebaseapp.com",
  databaseURL: "https://pickflix.firebaseio.com",
  projectId: "pickflix",
  storageBucket: "pickflix.appspot.com",
  messagingSenderId: "653704854837",
  appId: "1:653704854837:web:63e15f8b50e1bc99b2207c",
  measurementId: "G-KKRGTNKYBF",
};

export default (store) => {
  firebase.initializeApp(firebaseConfig);
  const rrfConfig = {
    // userProfile: "users",
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  };
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    // createFirestoreInstance // <- needed if using firestore
  };
  return rrfProps;
};
