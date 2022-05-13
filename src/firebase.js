import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAm9EChtAw9gWrldiw_roCrQ1Zx9Keo7jQ",
  authDomain: "final-year-project-8e184.firebaseapp.com",
  projectId: "final-year-project-8e184",
  storageBucket: "final-year-project-8e184.appspot.com",
  messagingSenderId: "852047822847",
  appId: "1:852047822847:web:db9ecfe46ebc71277cb1ca",
  measurementId: "G-E33V01BF1B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;