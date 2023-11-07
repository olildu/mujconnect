import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { getDatabase, ref, get, child, onValue, onChildAdded , update, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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
var path3;
var path4;
var msgs_count;
var chatRef; 
var update_prev_msg;
let searchTimeout;
let userFound = false;

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
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/' + 'chats/' + uid + '/prev_msg_user')).then((snapshot) => {
        if (snapshot.val() == null){
            setTimeout(() => {
                document.getElementById('text').className = 'changed-text'
                document.getElementById('spinner').className = 'changed-spinner'
            }, 500);
            setTimeout(() => {
                document.getElementById('waiter').remove()
                document.getElementById('blur').remove()
            }, 100);
        }
    })

    onChildAdded(starCountRef, (childSnapshot) => {
        const prev_user = childSnapshot.val();
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
            setTimeout(() => {
                document.getElementById('text').className = 'changed-text'
                document.getElementById('spinner').className = 'changed-spinner'
            }, 1500);
            setTimeout(() => {
                document.getElementById('waiter').remove()
                document.getElementById('blur').remove()
            }, 1600);
            replace_name_pfp();
        });
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

    if (userFound){
        document.getElementById('collapse').style.animation = 'fadeout 0.2s ease-in forwards';
        document.getElementById('new-chat').style.animation = 'fadeout 0.2s ease-in forwards';
        document.getElementById('user-search').style.animation = 'fadeout 0.2s ease-in forwards';
        document.getElementById('search-information').style.animation = 'fadeout 0.1s ease-in forwards';
        setTimeout(() => {
            document.getElementById('search-container').style.display = 'none'; 
        }, 100);
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
        scrollToBottom();
    });
}
function send_msg(dataValue, uid) {
    document.getElementById("send-msgs").addEventListener("click", function() {
        path = ref(database, "/" + 'chats/' + uid + "/and/" + dataValue);
        path2 = ref(database, "/" + 'chats/' + dataValue + "/and/" + uid);
        path3 = ref(database, '/' + 'chats/' + uid + '/prev_msg_user')
        path4 = ref(database, '/' + 'chats/' + dataValue + '/prev_msg_user')
        const dataIdValue = document.getElementById("selected-uid").getAttribute("data-id");

        const starCountRef = ref(database, "/" + '/chats/' + uid + "/and/" + dataIdValue);
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
            var new_count = msgs_count + 1
            const dataIdValue = document.getElementById("selected-uid").getAttribute("data-id");

            update(path, {[new_count+"-me"]: msgs});
            update(path2, {[new_count+"-they"]: msgs});
            update(path3, {[dataIdValue]: dataIdValue})
            update(path4, {[uid]: uid})

            document.getElementById('send-msgs').value = '';

        }
    });
}
document.getElementById("collapse").addEventListener("click", function() {
    document.getElementById('collapse').style.animation = 'fadeout 0.2s ease-in forwards';
    document.getElementById('new-chat').style.animation = 'fadeout 0.2s ease-in forwards';
    document.getElementById('user-search').style.animation = 'fadeout 0.2s ease-in forwards';
    document.getElementById('search-information').style.animation = 'fadeout 0.1s ease-in forwards';
    setTimeout(() => {
        document.getElementById('search-container').style.display = 'none'; 
    }, 100);
})
document.getElementById("search").addEventListener("click", function() {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('search-information').style.animation = 'fadein 0.1s ease-in forwards';

    document.getElementById('collapse').style.animation = 'fadein 0.2s ease-in forwards';
    document.getElementById('new-chat').style.animation = 'fadein 0.2s ease-in forwards';
    document.getElementById('user-search').style.animation = 'fadein0.2s ease-in forwards';
    document.getElementById('search-information').style.padding = '10px'; 
    document.getElementById('search-container').style.width = '394px'; 
})

document.getElementById("user-search").addEventListener("input", e => {
    const searchQuery = e.target.value.trim().toLowerCase();

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        if (searchQuery.length >= 2) {
            const dbRef = ref(getDatabase(), "users/name_uid");
            get(dbRef)
                .then(snapshot => {
                    const container = document.getElementById("final-users");
                    container.innerHTML = "";

                    snapshot.forEach(childSnapshot => {
                        const userId = childSnapshot.key;
                        const displayName = childSnapshot.val();

                        if (userId === uid) {
                            return;
                        }

                        if (displayName.toLowerCase().includes(searchQuery)) {
                            const dbReference = ref(getDatabase());

                            get(child(dbReference, `/users/${userId}`)).then((snapshot) => {
                                userFound = true;
                                var prev_user_pfp = snapshot.val().pfp;

                                const userDiv = document.createElement("div");
                                userDiv.id = 'user';
                                userDiv.classList.add("user");
                                userDiv.setAttribute("data-id", userId);
    
                                const profilePictureDiv = document.createElement("div");
                                profilePictureDiv.setAttribute("id", "profile-picture-opp-prev");
                                profilePictureDiv.style.backgroundImage = `url('${prev_user_pfp}')`;
    
                                const profileNameDiv = document.createElement("div");
                                const profileNameHeading = document.createElement("h2");
                                profileNameHeading.setAttribute("id", "profile-name-opp-prev");
                                profileNameHeading.textContent = displayName;
                                profileNameDiv.appendChild(profileNameHeading);
                    
                                userDiv.appendChild(profilePictureDiv);
                                userDiv.appendChild(profileNameDiv);
    
                                container.appendChild(userDiv);
                                replace_name_pfp();
                            });
                        }
                    });
                })
        } else {
            const container = document.getElementById("final-users");
            container.innerHTML = "";
        }
    }, 200);
});
let mouseTimer;
let leftBarExpanded = false;

function handleMouseMove(event) {
  const mouseX = event.clientX;

  if (mouseX <= 5) {
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      if (!leftBarExpanded) {
        expandLeftBar();
      }
    }, 200);
  } else {
    clearTimeout(mouseTimer);
  }
}

function expandLeftBar() {
  document.getElementById('nav-bar').style.minWidth = '70px';
  document.getElementById('text-holder').style.left = '50%';
  document.getElementById('logo-div').style.left = '4px';
  leftBarExpanded = true;
}

function collapseLeftBar() {
  document.getElementById('nav-bar').style.minWidth = '0';
  document.getElementById('text-holder').style.left = '0';
  document.getElementById('logo-div').style.left = '-60px';
  leftBarExpanded = false;
}

document.addEventListener('mousemove', handleMouseMove);

document.addEventListener('click', function(event) {
  const leftBar = document.getElementById('nav-bar');
  if (!leftBar.contains(event.target)) {
    if (leftBarExpanded) {
      collapseLeftBar();
    }
  }
});
function scrollToBottom() {
    const liveMessage = document.getElementById("live-message");
    liveMessage.scrollTop = liveMessage.scrollHeight;
  }

const sendMsgTextarea = document.getElementById('send-msgs');
sendMsgTextarea.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    console.log('Enter key pressed!');
    event.preventDefault()
    var msgs = document.getElementById('send-msgs').value;
    if (msgs === "") {
        return;
    } else {
        
        var new_count = msgs_count + 1
        const dataIdValue = document.getElementById("selected-uid").getAttribute("data-id");

        update(path, {[new_count+"-me"]: msgs});
        update(path2, {[new_count+"-they"]: msgs});
        update(path3, {[dataIdValue]: dataIdValue})
        update(path4, {[uid]: uid})

        document.getElementById('send-msgs').value = '';
    }
  }
});