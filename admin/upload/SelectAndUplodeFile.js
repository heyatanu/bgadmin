//--------------------------VARIABLES-------------------------------------------------//
var ImgName, ImgUrl;
var files = [];
var reader;
const d = new Date();
let timeanddate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes();
let timeanddateforid = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes();
var imageuploadstatus=document.getElementById("imageuploadstatus");
var imagename=document.getElementById("imagename");
var urllink=document.getElementById("urllink");
var title=document.getElementById("title");
var offerlink=document.getElementById("offerlink");
var ytubevdolink=document.getElementById("ytubevdolink");
var expiredate=document.getElementById("expiredate");
var discription=document.getElementById("discription");
let msgfromauthor=document.getElementById("msgfromauthor");

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
    imageuploadstatus.innerHTML="Wait";
    db.collection('admin').get().then((snapshot) => {
        for (let i=0;i<snapshot.size;i++){
        let pas= (snapshot.docs[i].data().pass)
        let adminname= (snapshot.docs[i].data().name)
        let adminid= (snapshot.docs[i].data().adminid)

        if(pas==document.getElementById("adminid").value){
            let id=getmainurl(urllink.value);
            imageuploadstatus.innerHTML="Started uploading";
            firebase.database().ref('session/').once('value', function(snapshot) {
                var uploadTask = firebase.storage().ref('Files/' + files[0].name).put(files[0]);
        
                    uploadTask.on('state_changed', function(snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progress = parseInt(progress)
                        imageuploadstatus.innerHTML="uploading article "+progress+"%";
                        if(progress==100){
                        imageuploadstatus.innerHTML="Upload Complete. Access ID: \n"+id;
                        
                        }
                    },
        
                    function(error) {
                            alert("ERROR IN SAVING IMAGE");
                    },
            
                    function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                            ImgUrl=url;
                            
                            firebase.database().ref('session/' + id).set({
                                id:id,
                                title:title.value,
                                offerlink:offerlink.value,
                                ytubevdolink:ytubevdolink.value,
                                expiredate:expiredate.value,
                                discription:discription.value,
                                imageurl:ImgUrl,
                                isexpired:false,
                                msgfromauth:msgfromauthor.value
                            });


                            firebase.database().ref('updates/' + (adminid+"||UPL||"+timeanddateforid)).set({
                                adminid:adminid,
                                name:adminname,
                                articldid:id,
                                status:"UPLOAD",
                                time:timeanddate
                            });
                        }

                        
                    );
            });
        });
            break
        }
        else{
            imageuploadstatus.innerHTML="Check the adminID";
        }
        }
    }).catch(err => {
        // console.log("ERROR");
    });
        
}


var getmainurl = function (titleurl) {
    return (titleurl+"-"+ Math.random().toString(36).substr(2, 6)).toLowerCase();
  };

  
  firebase.database().ref('updates/').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val())
    });
});