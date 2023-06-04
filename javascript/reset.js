import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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

document.getElementById("reset-button").addEventListener("click", function() {
    var email = document.getElementById('email').value

    var result = emailverify(email);
    
    if (result == false){
        return(false)
    }
    
    sendPasswordResetEmail(auth, email)
    .then(() => {
        document.getElementById('blur').classList.toggle("fader");
        document.getElementById('popup').classList.toggle("fade-in");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/user-not-found'){
        document.getElementById('wrongmail1').innerHTML = 'This Email ID is not registered';
        document.getElementById("wrongmail1").style.visibility = "visible";
        return(false)
      }
    });

});

function emailverify(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    else
    {   
        document.getElementById("wrongmail1").style.visibility = "visible";
        return (false)
    }
};
document.getElementById("login-button").addEventListener("click", function() {
    window.location = '/login.html'
})