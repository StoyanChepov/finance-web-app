import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2D-DvAAG88M3OkcAfsBTVOEgf0CVqD4E",
  authDomain: "finance-web-app-attachments.firebaseapp.com",
  projectId: "finance-web-app-attachments",
  storageBucket: "finance-web-app-attachments.appspot.com",
  messagingSenderId: "555600352265",
  appId: "1:555600352265:web:beff715bc3ba9bd334d4d8",
  measurementId: "G-H4D3Q2PQVM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
