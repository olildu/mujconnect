function handleImageUpload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
  
    reader.onload = function (e) {
      var imageDataURL = e.target.result;
      var dottedPreview = document.getElementById("dotted-preview");
      dottedPreview.style.backgroundImage = `url(${imageDataURL})`;
    };
  
    reader.readAsDataURL(file);
    document.getElementById('upload-done').textContent = 'Done'
    document.getElementById('material-icons').textContent = 'done'
    
  }
  