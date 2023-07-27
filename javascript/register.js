import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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

    document.getElementById("wrongmail").style.visibility = "hidden";
    document.getElementById("wrongpassword").style.visibility = "hidden";

    emailverify(email);
    passwordverify(password);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(auth.currentUser)
            
            sendEmailVerification(auth.currentUser)

            document.getElementById('blur').classList.toggle("fader");
            document.getElementById('popup').classList.toggle("fade-in");
        })
        .catch((error) => {
            // Handle the error
            if (error.code === "auth/email-already-in-use") {
                document.getElementById("wrongmail").textContent = "This email is already in use";
                document.getElementById("wrongmail").style.visibility = "visible";
            }
        });
})


function emailverify(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
    else
    {   
        document.getElementById("wrongmail").textContent = "This email is invalid";
        document.getElementById("wrongmail").style.visibility = "visible";
        return (false)
    }
}

function passwordverify(password) {
    if (password.length < 6 ) 
    {
    document.getElementById("wrongpassword").style.visibility = "visible";
    return(false)
    }
}

document.getElementById("login-button").addEventListener("click", function() {
    window.location = '/login.html'
})
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      document.getElementById('signup-button').click()
    }
  });