import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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


document.getElementById("home-div").addEventListener("click", function() {
    window.location = '/main.html'
})
document.getElementById("chat-div").addEventListener("click", function() {
    window.location = '/chat.html'
})
document.getElementById("new-note").addEventListener("click", function() {
  window.location = '/notes.html'
})

var ran = false
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = auth.currentUser.uid

    const path = ref(database, '/'+ '/notes/' + uid );
    onValue(path, (snapshot) => {
      runOnce()

      const data = snapshot.val() ;
      const count = data.notes_number

      var x ="", i;
      for (i=1; i<=count; i++) {
        
        const notes = data[`${i}`]

        x = x + `<div class='saved-notes' id='${i}'` + `"><img src='/images/t.png' class='trash' id='trash${i}'><p>`+ notes + "</p></div>";
      }
      document.getElementById("saved-notes-container").innerHTML = x;

      var elements = document.querySelectorAll('.trash');

      remove_notes()

      function remove_notes() {
      elements.forEach(function(element) {
        element.addEventListener('click', function() {
          
          var remove_element_id = document.getElementById(element.id).parentNode.id

          document.getElementById(remove_element_id).remove()

          var numbers = parseInt(remove_element_id.replace(/\D/g, ""))
          var result = remove_element_id.replace(/\d+/g, "");

          var e = parseInt(count-numbers)
          remove(ref(database, "/" + 'notes/' + uid + '/' + remove_element_id))

          for (let r = 1; r < e+1 ; r++){

            var x = numbers+r;
            var y = numbers+r-1;

            var final = data[x]
            console.log(y)
            console.log(final)
            update(ref(database, "/" + '/notes/' + uid ), {[y]:final})
            
          }
          
          var keys = Object.keys(data);
          var lastKey = keys[keys.length - 2];

          remove(ref(database, "/" + 'notes/' + uid + '/' + lastKey))


          update(ref(database, "/" + '/notes/' + uid ), {notes_number:count-1})


        });
      });
    }
      
    });

  }
});

function runOnce(){
  if (ran == false){
    document.getElementById('spinner').className = 'changed-spinner'
    document.getElementById('text').className = 'changed-text'
    setTimeout(document.getElementById('waiter').remove(),700)
    ran = true
  }
}