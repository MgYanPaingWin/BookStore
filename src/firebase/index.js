import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCO4RxSxaRBfno2tsioydauubu34EEMMk",
  authDomain: "library-app-45a0a.firebaseapp.com",
  projectId: "library-app-45a0a",
  storageBucket: "library-app-45a0a.firebasestorage.app",
  messagingSenderId: "673514504564",
  appId: "1:673514504564:web:7057c90ded64cf46076c21",
  measurementId: "G-RR5SX1D9BR"
};

const app = initializeApp(firebaseConfig);

let db=getFirestore(app);
let auth=getAuth(app);

export {db,auth};