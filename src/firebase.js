import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyABUNMvIYaJhuq1u8cw-54SpRZsz6gRU-0",
  authDomain: "app-93a48.firebaseapp.com",
  projectId: "app-93a48",
  storageBucket: "app-93a48.appspot.com",
  messagingSenderId: "94758481138",
  appId: "1:94758481138:web:77f4d07a6b093caba8746b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };