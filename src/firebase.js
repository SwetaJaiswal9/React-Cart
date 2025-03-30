import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "cart-b39db.firebaseapp.com",
  projectId: "cart-b39db",
  storageBucket: "cart-b39db.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true })
  .then(() => {
    console.log("Offline persistence enabled");
  })
  .catch((err) => {
    console.error("Error enabling offline persistence: ", err);
  });

export { db };
