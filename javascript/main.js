import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth,onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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


auth.onAuthStateChanged(user =>{
    console.log(user.photoURL)
    if (user == null){
        window.location = '/login.html'
    }
    else{
        document.getElementById('Name').textContent = user.displayName
        document.getElementById('profile-pic').style.backgroundImage = `url(${user.photoURL})`
    }
})

