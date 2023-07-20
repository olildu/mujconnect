import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

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
const storage = getStorage();



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
    document.getElementById("pass-name-input").type = 'text'
    second.style.display = 'block'
})
document.getElementById("button-pfp").addEventListener("click", function() {
    var third = document.getElementById("third-overlay")
    var image_container = document.getElementById("image-container")
    image_container.style.display = 'block'
    third.style.display = 'block'
})
document.getElementById("outer2").addEventListener("click", function() {
    var third = document.getElementById("third-overlay")
    var image_container = document.getElementById("image-container")
    var dottedPreview = document.getElementById("dotted-preview");
    image_container.style.display = 'none'
    third.style.display = 'none'
    
    document.getElementById('upload-done').textContent = 'Upload'
    document.getElementById("file").value = ''
    dottedPreview.style.backgroundImage = ''
})

document.getElementById("outer").addEventListener("click", function() {
    var second = document.getElementById("second-overlay")
    second.style.display = 'none'
    if(document.getElementById("pass-name-input").type == 'password'){
        var pass = document.getElementById("pass-name-input").value

        if (pass == ''){
            return false
        }
        updatePassword(auth.currentUser, pass).catch((error) => {
            console.log('error')
        });
    }
    if(document.getElementById("pass-name-input").type == 'text'){
        var name = document.getElementById("pass-name-input").value
        if (name == ''){
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
            return false
        }
        updatePassword(auth.currentUser, pass).catch((error) => {
            console.log('error')
        });
    }
    if(document.getElementById("pass-name-input").type == 'text'){
        var name = document.getElementById("pass-name-input").value
        if (name == ''){
            return false
        }
        updateProfile(auth.currentUser, {
            displayName: name
          })

        document.getElementById("pass-name-input").value = ''
    }
})
document.getElementById('file').addEventListener('change', function() {
    var file = event.target.files[0];
    var reader = new FileReader();
  
    if (file.size > 7 * 1024 * 1024) {
      alert('File size exceeds the limit of 7 MB.');
      return;
    }
  
    reader.onload = function(e) {
      var imageDataURL = e.target.result;
  
      var img = new Image();
      img.src = imageDataURL;
  
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
  
        var maxWidth = 300;
        var maxHeight = 300;
  
        var width = img.width;
        var height = img.height;
        if (width > height && width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        } else if (height > maxWidth) {
          width *= maxHeight / height;
          height = maxHeight;
        }
  
        canvas.width = width;
        canvas.height = height;
  
        ctx.drawImage(img, 0, 0, width, height);
  
        var compressedImageDataUrl = canvas.toDataURL('image/jpeg', 0.8); 
  
        var dottedPreview = document.getElementById('dotted-preview');
        dottedPreview.style.backgroundImage = `url(${compressedImageDataUrl})`;
        
        upload(compressedImageDataUrl);
      };
    };
  
    reader.readAsDataURL(file);
  });
  
function upload(imageDataURL){
    document.getElementById('upload-done').textContent = 'Done'
    document.getElementById('material-icons').textContent = 'done'
    document.getElementById('supp').htmlFor = '';
    document.getElementById('supp').id = 'done'
    console.log('vanneda')
    document.getElementById("done").addEventListener("click", function() {
        console.log('vanneda')
        const storage = getStorage();
        if(imageDataURL.includes('jpeg')){
            var result = imageDataURL.substring(23);
            }
        if(imageDataURL.includes('png')){
            var result = imageDataURL.substring(22);
        } 

        const storageRef = ref(storage, `images/${auth.currentUser.uid}/profile-picture/profile-picture.jpg`);
        console.log(`images/${auth.currentUser.uid}/profile-picture.jpg`)

        const bytes = Uint8Array.from(atob(result), (c) => c.charCodeAt(0));

        uploadBytes(storageRef, bytes).then((snapshot) => {
            console.log('Uploaded the image successfully!');
            document.getElementById('upload-done').textContent = 'Upload'
            document.getElementById('material-icons').textContent = 'add_photo_alternate'
            document.getElementById('done').id = 'supp'
            document.getElementById('supp').htmlFor = 'file';
            document.getElementById("dotted-preview").style.backgroundImage = ''

        }).catch((error) => {
            console.error('Error uploading the image:', error);
        });
        getDownloadURL(ref(storage, `images/${auth.currentUser.uid}/profile-picture/profile-picture.jpg`))
        .then((url) => {
            updateProfile(auth.currentUser, {
                photoURL: `${url}`
            })
        })  
    })}
