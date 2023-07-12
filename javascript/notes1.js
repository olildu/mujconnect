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
var re;

document.getElementById("home-div").addEventListener("click", function() {
    window.location = '/main.html'
})
document.getElementById("chat-div").addEventListener("click", function() {
    window.location = '/chat.html'
})

auth.onAuthStateChanged(user =>{
  if (user == null){
      window.location = '/login.html'
  }
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

        x += `<div class='saved-notes' id='${i}'"><div class='circle'></div><img src='/images/t.png' class='trash' id='trash${i}'><img src='/images/pen.png' class='pen' id='pen${i}'><p id='p${i}'>${notes}</p></div>`;
      }
      document.getElementById("saved-notes-container").innerHTML = x;

      var elements = document.querySelectorAll('.trash');

      remove_notes()
      test()

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



document.getElementById("take-note").addEventListener("click", function(event) {
  var element = document.getElementById('take-note')
  var containered = document.getElementById('saved-notes-container')

  containered.style.top = '27%'
  // element.style.animation = "movein 0.2s ease-in-out forwards";
  
  var max_window = document.getElementById('outer')
  max_window.style.width = '100%';
  max_window.style.height = '100%';
})

document.getElementById("outer").addEventListener("click", function(event) {
  var max_window = document.getElementById('outer')
  var containered = document.getElementById('saved-notes-container')

  max_window.style.width = '0%';
  max_window.style.height = '0%';

  var element1 = document.getElementById('take-note')

  const uid = auth.currentUser.uid;


  const dbRef = ref(getDatabase());

  get(child(dbRef, '/'+ '/notes/' + uid )).then((snapshot) => {
    var note = document.getElementById("take-note").value
    if (note == ''){
      return false
    }

    var count = snapshot.val().notes_number + 1
    var notes = count
    update(ref(database, "/"+ '/notes/' + uid), {[notes]:note})

  update(ref(database, "/"+ '/notes/' + uid), {notes_number:count})
  var note = document.getElementById("take-note").value = "" });

  element1.style.animation = "moveout 0s ease-in forwards";
  containered.style.top = '23%'


})

function test() {
  var children = document.querySelectorAll('.pen');
  children.forEach(function(element) {
    element.addEventListener('click', function() {
      re = document.getElementById(element.id).parentNode.id;
      var k = document.getElementById('p' + re).textContent;

      var coverer = document.getElementById('coverem');
      coverer.style = '';
      coverer.style.animation = 'fadein 0.3s ease-in forwards';
      coverer.style.display = 'block';

      var divElement = document.createElement("textarea");
      divElement.id = 'new-created';
      divElement.innerText = k;

      var divElement1 = document.createElement("div");
      divElement1.id = 'edit-notes-container';

      document.getElementById('coverem').append(divElement1);
      document.getElementById('edit-notes-container').append(divElement);

      divElement.focus();

      setTimeout(function() {
        click_listener();
      }, 500); 
    });
  });
}

function click_listener() {
  var newNotesElement = document.getElementById("new-created");
  
  newNotesElement.addEventListener("focusout", function() {
    var uid = auth.currentUser.uid;
    var new_notes = newNotesElement.value;

    if (new_notes == ''){
      return false
    }

    document.addEventListener("click", function(event) {
      var desiredElementId = "new-created";
      var clickedElementId = event.target.id;
    
      if (clickedElementId !== desiredElementId) {
        console.log('clickoutside')
      }
    });
    update(ref(database, "/" + '/notes/' + uid), { [re]: new_notes });

    var coverem = document.getElementById("coverem");
    coverem.style.animation = "fadeout 0.3s ease-in forwards";

    var editNotesContainer = document.getElementById("edit-notes-container");
    if (editNotesContainer) {
      editNotesContainer.remove();
    }
    document.getElementById("coverem").style.display = "none";

    setTimeout(function() {
      document.getElementById("coverem").style = "";
    }, 1000);
  });
}
