import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFde5Hdt3CTbVw71uK89JThLPCq-6iNa8",
  authDomain: "muj-connect-d2e2b.firebaseapp.com",
  projectId: "muj-connect-d2e2b",
  storageBucket: "muj-connect-d2e2b.appspot.com",
  messagingSenderId: "790443205869",
  appId: "1:790443205869:web:020a252e60cc19ed3bd8e4"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const storage = getStorage();
function guacamole(){ 
  getDownloadURL(ref(storage, `images/${auth.currentUser.uid}/profile-picture.jpg`))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
    });
}
guacamole()