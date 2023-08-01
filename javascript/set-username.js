import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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
const auth = getAuth();
const database = getDatabase(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    var Name = String(user.displayName)
    
    if(Name == 'null'){
    }
    else {
      window.location = '/home.html' 
  }}
});

document.getElementById("done-button").addEventListener("click", function() {
    var name = document.getElementById('user').value
    var path = ref(database, "/" + 'users/' + auth.currentUser.uid);

    updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        if (user.photoURL == null){
          const final_name = name.split(" ").slice(0, 2).join("+");
          updateProfile(auth.currentUser, {
              photoURL: `https://ui-avatars.com/api/?name=${final_name}`});
          }
        update(path, {pfp: auth.currentUser.photoURL});
        update(path, {id: auth.currentUser.uid});
        update(path, {name: auth.currentUser.displayName});

        console.log(auth.currentUser.uid, auth.currentUser.displayName)
        update(ref(database, "/users/name_uid/"  ), {[auth.currentUser.uid]: auth.currentUser.displayName})

        window.location = '/home.html'
      })
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('done-button').click()
  }
});
