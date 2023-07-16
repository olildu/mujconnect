import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth,onAuthStateChanged, signOut, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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
    if (user == null){
        window.location = '/login.html'
    }
    else{
        document.getElementById('button-pfp').style.backgroundImage = `url(${user.photoURL})`
    }
})

document.getElementById("button-c").addEventListener("click", function() {
    var second = document.getElementById("second-overlay")
    document.getElementById("pass-name-p").textContent = 'Enter your password'
    document.getElementById("pass-name-h2").textContent = 'Change password'
    document.getElementById("pass-name-input").type = 'password'
    second.style.display = 'block'
})
document.getElementById("button-p").addEventListener("click", function() {
    var second = document.getElementById("second-overlay")
    document.getElementById("pass-name-p").textContent = 'Enter your name'
    document.getElementById("pass-name-h2").textContent = 'Change display name'
    document.getElementById("pass-name-input").type = 'none'
    second.style.display = 'block'
})
document.getElementById("outer").addEventListener("click", function() {
    var second = document.getElementById("second-overlay")
    second.style.display = 'none'

    if(document.getElementById("pass-name-input").type == 'password'){
        var pass = document.getElementById("pass-name-input").value

        if (pass == ''){
            console.log('empty')
            return false
        }
        updatePassword(auth.currentUser, pass).catch((error) => {
            console.log('error')
        });
    }
    if(document.getElementById("pass-name-input").type == 'text'){
        console.log('name')
        var name = document.getElementById("pass-name-input").value
        console.log(typeof name)
        if (name == ''){
            console.log('empty')
            return false
        }
        updateProfile(auth.currentUser, {
            displayName: name
          })
          
        document.getElementById("pass-name-input").value = ''

    }


})
document.getElementById("save-changes").addEventListener("click", function() {
    var second = document.getElementById("second-overlay")
    second.style.display = 'none'

    if(document.getElementById("pass-name-input").type == 'password'){
        var pass = document.getElementById("pass-name-input").value

        if (pass == ''){
            console.log('empty')
            return false
        }
        updatePassword(auth.currentUser, pass).catch((error) => {
            console.log('error')
        });
    }
    if(document.getElementById("pass-name-input").type == 'text'){
        console.log('name')
        var name = document.getElementById("pass-name-input").value
        console.log(typeof name)
        if (name == ''){
            console.log('empty')
            return false
        }
        updateProfile(auth.currentUser, {
            displayName: name
          })

        document.getElementById("pass-name-input").value = ''

    }

})
