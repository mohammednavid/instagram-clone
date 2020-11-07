import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBqzOeSfl_rLO5Wc3TXPDfUT2HS-jgMFcU",
  authDomain: "instagram-clone-6c210.firebaseapp.com",
  databaseURL: "https://instagram-clone-6c210.firebaseio.com",
  projectId: "instagram-clone-6c210",
  storageBucket: "instagram-clone-6c210.appspot.com",
  messagingSenderId: "558400907313",
  appId: "1:558400907313:web:9908241080a5c419bc0d10",
  measurementId: "G-VJ62PHWQDM"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default firebaseApp;
export { db, auth, storage };
