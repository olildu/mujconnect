import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    var Name = String(user.displayName)
    
    if(Name == 'null'){
    }
    else {
      window.location = '/main.html' 
  }}
});

document.getElementById("done-button").addEventListener("click", function() {
    var name = document.getElementById('user').value
    updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        console.log(name)
        if (user.photoURL == null){
          const final_name = name.split(" ").slice(0, 2).join("+");
          console.log(final_name)
          updateProfile(auth.currentUser, {
              photoURL: `https://ui-avatars.com/api/?name=${final_name}`});
          }

        window.location = '/main.html'
      })
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('done-button').click()
  }
});