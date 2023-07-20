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
    console.log(user)
    if (user == null){
        window.location = '/login.html'
    }
    else{
        document.getElementById('Name').textContent = user.displayName
        document.getElementById('profile-pic').style.backgroundImage = `url(${user.photoURL})`
        document.getElementById('profile-pic').style.border = "1px solid white"
    }
})


document.getElementById("profile-pic").addEventListener("click", function() {
    var profile_overlay = document.getElementById('profile-overlay')
    var outer1 = document.getElementById('outer1')

    profile_overlay.style.display = 'block'
    profile_overlay.style.animation = 'fadein 0.5s ease-out forwards';
    outer1.style.width = '100%'
    outer1.style.height = '100%'
    outer1.style.zIndex = '1'
  })

document.getElementById("outer1").addEventListener("click", function() {
    var profile_overlay = document.getElementById('profile-overlay')
    var outer1 = document.getElementById('outer1')

    profile_overlay.style.display = 'none'
    outer1.style.width = '0%'
    outer1.style.height = '0%'
    outer1.style.zIndex = '0'
})

document.getElementById("sign-out").addEventListener("click", function() {
    signOut(auth)
})  

