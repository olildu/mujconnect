import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFde5Hdt3CTbVw71uK89JThLPCq-6iNa8",
  authDomain: "muj-connect-d2e2b.firebaseapp.com",
  databaseURL: "https://muj-connect-d2e2b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "muj-connect-d2e2b",
  storageBucket: "muj-connect-d2e2b.appspot.com",
  messagingSenderId: "790443205869",
  appId: "1:790443205869:web:020a252e60cc19ed3bd8e4",
  measurementId: "G-W82YF9C7J0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app)

var path = ref(database, "/" + 'chats/' + "GbXiptTH78Rjiw0BdKNpFx9neH42" + "/prev_msg_user/");

update(path, {1: "qRGRJK1KYKN9oHdAMC2RBatROB42"});
