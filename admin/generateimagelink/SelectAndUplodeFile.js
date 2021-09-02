//--------------------------VARIABLES-------------------------------------------------//
var ImgName, ImgUrl;
var files = [];
var reader;
let urllink=document.getElementById("urllink");

//----------------------SELECT THE IMAGE---------------//

document.getElementById("select").onclick = function(e) {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function() {
        }
        reader.readAsDataURL(files[0]);
        imagename.value=(files[0].name);
        imageuploadstatus.innerHTML="<b>Image selected</b>";
    }

    input.click();
}


//----------------------UPLOAD THE IMAGE---------------//
document.getElementById("upload").onclick = function() {
    imageuploadstatus.innerHTML="Started uploading";
    firebase.database().ref('session/').once('value', function(snapshot) {
        var uploadTask = firebase.storage().ref('Imagelink/' + files[0].name).put(files[0]);

            uploadTask.on('state_changed', function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress = parseInt(progress)
                imageuploadstatus.innerHTML="uploading article "+progress+"%";
                if(progress==100){
                imageuploadstatus.innerHTML="Upload Complete";
                }
            },

            function(error) {
                    alert("ERROR IN SAVING IMAGE");
            },
    
            function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                    ImgUrl=url;
                    urllink.value=ImgUrl
                }

                
            );
    });
});
}




function copylink() {
    /* Get the text field */
    var copyText = document.getElementById("urllink");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }