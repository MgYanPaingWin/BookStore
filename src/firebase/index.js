import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsZ6GMdFY5w2Y4Gh4ac_pfCSvnDkdIHjc",
  authDomain: "librra-app.firebaseapp.com",
  projectId: "librra-app",
  storageBucket: "librra-app.firebasestorage.app",
  messagingSenderId: "83034154492",
  appId: "1:83034154492:web:45e52ef2512d3cbd743e79"
};
const app = initializeApp(firebaseConfig);

let db=getFirestore(app);
let auth=getAuth(app);

export {db,auth};