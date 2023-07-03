import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFde5Hdt3CTbVw71uK89JThLPCq-6iNa8",
  authDomain: "muj-connect-d2e2b.firebaseapp.com",
  projectId: "muj-connect-d2e2b",
  storageBucket: "muj-connect-d2e2b.appspot.com",
  messagingSenderId: "790443205869",
  appId: "1:790443205869:web:020a252e60cc19ed3bd8e4",
  databaseURL: "https://muj-connect-d2e2b-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const starCountRef = ref(database, '/' + '/notes/' + uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data == null){
        update(ref(database, "/"+ '/notes/' + uid   ), {notes_number:0})
        update(ref(database, "/"+ '/notes/' + uid ), {notes_number:0})

      }

      if (data.notes_number == undefined){
        update(ref(database, "/"+  '/notes/' + uid ), {notes_number:0})
        update(ref(database, "/"+ '/notes/' + uid ), {notes_number:0})

      }
      update(ref(database, "/"+  '/users/'+ uid  ), {notes_number:0})
      
    });
  }
});



document.getElementById("clicker").addEventListener("click", function() {
    const uid = auth.currentUser.uid;


    const dbRef = ref(getDatabase());

    get(child(dbRef, '/'+ '/notes/' + uid )).then((snapshot) => {
      var note = document.getElementById("take-notes").value
      var count = snapshot.val().notes_number + 1
      console.log(count)
      var notes = count
      update(ref(database, "/"+ '/notes/' + uid), {[notes]:note})
  
    update(ref(database, "/"+ '/notes/' + uid), {notes_number:count})
    var note = document.getElementById("take-notes").value = "" });
})
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('clicker').click()
  }
});
