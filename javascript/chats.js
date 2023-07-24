import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { getDatabase, ref, get, child, onValue, onChildAdded , update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getFirestore, doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
const database = getDatabase(app);
var uid;
var path;
var path2;
var msgs_count;
var chatRef; 

onAuthStateChanged(auth, (user) => {
    if (user == null) {
        window.location = '/login.html';
    } else {
        document.getElementById('profile-name').textContent = user.displayName;
        document.getElementById('profile-picture').style.backgroundImage = `url(${user.photoURL})`;
    }
    uid = user.uid;
    bullshit(uid);
});

function bullshit(uid) {
    const starCountRef = ref(database, '/' + 'chats/' + uid + '/prev_msg_user');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        var count = data.total_number;

        for (var i = 1; i <= count; i++) {
            var prev_user = data[i];
            const dbRef = ref(getDatabase());
            get(child(dbRef, `/users/${prev_user}`)).then((snapshot) => {
                
                var prev_user_name = snapshot.val().name;
                var prev_user_pfp = snapshot.val().pfp;
                var prev_user_id = snapshot.val().id;
                const container = document.getElementById("prev-user");

                const userDiv = document.createElement("div");
                userDiv.id = 'user';
                userDiv.classList.add("user");
                userDiv.setAttribute("data-id", prev_user_id);
                const profilePictureDiv = document.createElement("div");
                profilePictureDiv.setAttribute("id", "profile-picture-opp-prev");
                profilePictureDiv.style.backgroundImage = `url('${prev_user_pfp}')`;

                const profileNameDiv = document.createElement("div");
                const profileNameHeading = document.createElement("h2"); 
                profileNameHeading.setAttribute("id", "profile-name-opp-prev");
                profileNameHeading.textContent = prev_user_name;
                profileNameDiv.appendChild(profileNameHeading);

                userDiv.appendChild(profilePictureDiv);
                userDiv.appendChild(profileNameDiv);

                container.appendChild(userDiv);
                replace_name_pfp();
            });
        }
    
    });
}

function replace_name_pfp() {
    var users = document.getElementsByClassName('user');
    Array.from(users).forEach(function(user) {
        user.removeEventListener('click', handleClick);
        user.addEventListener('click', handleClick);
    });
}

function handleClick() {
    const liveMessageDiv = document.getElementById("live-message");

    while (liveMessageDiv.firstChild) {
        liveMessageDiv.removeChild(liveMessageDiv.firstChild);
    }

    const dataValue = this.getAttribute("data-id");
    document.getElementById('selected-uid').setAttribute("data-id", dataValue);
    const profileName = this.querySelector('h2').textContent;
    const backgroundImage1 = window.getComputedStyle(this.querySelector('#profile-picture-opp-prev')).backgroundImage;
    document.getElementById('profile-name-opp').textContent = profileName;
    document.getElementById('profile-picture-opp').style.backgroundImage = backgroundImage1;
    send_msg(dataValue, uid);
    read_msgs(dataValue, uid);
}

function read_msgs(dataValue, uid) {
    if (chatRef) {
        chatRef();
    }

    chatRef = onChildAdded(ref(database, '/chats/' + uid + "/and/" + dataValue), (snapshot) => {
        const newMessage_key = snapshot.key;
        const newMessage = snapshot.val();

        const liveMessageContainer = document.getElementById("live-message");
        const messageDiv = document.createElement("div");
        messageDiv.id = "msg1";
        const messageParagraph = document.createElement("p");
        messageParagraph.id = "msg1-content";

        if (newMessage_key.includes("me")) {
            messageDiv.classList.add("me");
        } else {
            messageDiv.classList.add("they");
            messageDiv.style.backgroundColor = 'rgb(171 171 171)';
        }

        messageParagraph.textContent = newMessage;
        messageDiv.appendChild(messageParagraph);
        liveMessageContainer.appendChild(messageDiv);
    });
}
function send_msg(dataValue, uid) {
    document.getElementById("send-msgs").addEventListener("click", function() {
        path = ref(database, "/" + 'chats/' + uid + "/and/" + dataValue);
        path2 = ref(database, "/" + 'chats/' + dataValue + "/and/" + uid);
        console.log("/" + 'chats/' + uid + "/and/" + dataValue)
        const starCountRef = ref(database, "/" + '/chats/' + uid + "/and/" + dataValue);

        onValue(starCountRef, (snapshot) => {
            if (snapshot.val() === null || snapshot.val() === undefined) {
                msgs_count = 0;
            } else {
                msgs_count = Object.keys(snapshot.val()).length;
            }
        });
    });

    document.getElementById("final-send").addEventListener("click", function() {
        var msgs = document.getElementById('send-msgs').value;
        if (msgs === "") {
            return;
        } else {
            update(path, {[msgs_count+1+"-me"]: msgs});
            update(path2, {[msgs_count+1+"-they"]: msgs});
        }
        document.getElementById('send-msgs').value = '';
    });
}