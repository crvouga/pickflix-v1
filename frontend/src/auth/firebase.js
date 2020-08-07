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

firebase.initializeApp(firebaseConfig);

export default firebase;
