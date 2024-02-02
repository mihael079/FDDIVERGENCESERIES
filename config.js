
import firebase from "firebase";
//require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDe3X_dC55j1qz32JByUYsEfS8m9pglTa4",
  authDomain: "story-telling-app-be01f.firebaseapp.com",
  databaseURL: "https://story-telling-app-be01f-default-rtdb.firebaseio.com",
  projectId: "story-telling-app-be01f",
  storageBucket: "story-telling-app-be01f.appspot.com",
  messagingSenderId: "495683503102",
  appId: "1:495683503102:web:6cb492a2a5efba5c9476af"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
