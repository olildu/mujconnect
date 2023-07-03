import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyCFde5Hdt3CTbVw71uK89JThLPCq-6iNa8",
authDomain: "muj-connect-d2e2b.firebaseapp.com",
projectId: "muj-connect-d2e2b",
storageBucket: "muj-connect-d2e2b.appspot.com",
messagingSenderId: "790443205869",
appId: "1:790443205869:web:020a252e60cc19ed3bd8e4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

document.getElementById("signup-button").addEventListener("click", function() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    document.getElementById('wrongpassword').innerHTML = 'This password is invalid.'
    document.getElementById("wrongmail").style.visibility = "hidden";
    document.getElementById("wrongpassword").style.visibility = "hidden";

    emailverify(email);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      if (auth.currentUser.emailVerified == false){
        alert('Email Not Verified')
        return (false)
      }

      onAuthStateChanged(auth, (user) => {
        if (user) {
          var Name = String(user.displayName)
          if(Name == 'null'){
            window.location = '/set-username.html'
          }
          else{
            window.location = '/main.html'
            }
        }
      });
    })
    .catch((error) => {
        document.getElementById('wrongpassword').innerHTML = 'Wrong Email ID or Password.'
        document.getElementById("wrongpassword").style.visibility = "visible";
    });

function emailverify(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    else
    {   
        document.getElementById("wrongmail").style.visibility = "visible";
        return (false)
    }
}
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('signup-button').click()
  }
});