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
var msgfromauthor=document.getElementById("msgfromauthor");
var imageurl=document.getElementById("imageurl");

var url_string = window.location.href
var url = new URL(url_string);
var upid = url.searchParams.get("id");
document.getElementById("mainid").value=upid;



document.getElementById("upload").disabled = true;


//----------------------UPLOAD THE IMAGE---------------//
document.getElementById("upload").onclick = function() {
  imageuploadstatus.innerHTML="Wait";
db.collection('admin').get().then((snapshot) => {
  for (let i=0;i<snapshot.size;i++){
    let pas= (snapshot.docs[i].data().pass)
    let adminname= (snapshot.docs[i].data().name)
    let adminid= (snapshot.docs[i].data().adminid)
    if(pas==document.getElementById("adminid").value){
      var mainid=document.getElementById("mainid").value;
      if(document.getElementById("mainid").readOnly==true){
        imageuploadstatus.innerHTML="Updated";
      }
      firebase.database().ref('session/' + mainid).update({
        title:title.value,
        offerlink:offerlink.value,
        ytubevdolink:ytubevdolink.value,
        expiredate:expiredate.value,
        discription:discription.value,
        msgfromauth:msgfromauthor.value,
        imageurl:imageurl.value
    });

    firebase.database().ref('updates/' + (adminid+"||UPD||"+timeanddateforid)).set({
      adminid:adminid,
      name:adminname,
      articldid:mainid,
      status:"UPDATE",
      time:timeanddate
  });
  break;
    }
    else{
      imageuploadstatus.innerHTML="Check Admin ID";
    }
  }
}).catch(err => {
  // console.log("ERROR");
});

}


var getmainurl = function (titleurl) {
    return (titleurl+"-"+ Math.random().toString(36).substr(2, 9)).toLowerCase();
  };



  document.getElementById("getvalue").onclick = function() {
    var mainid=document.getElementById("mainid").value;
    mainid=mainid.trim();
    document.getElementById("mainsts").innerHTML="Wait for a sec";
    firebase.database().ref('session/' + mainid).on('value',function(snapshot){
      if(snapshot.val()==null){
        document.getElementById("mainsts").innerHTML="ID not found";
      }
      else{
        document.getElementById("upload").disabled = false;
        document.getElementById("mainsts").innerHTML="ID found. Update the values";
        document.getElementById("mainid").readOnly= true;
        title.value=snapshot.val().title;
        offerlink.value=snapshot.val().offerlink;
        ytubevdolink.value=snapshot.val().ytubevdolink;
        expiredate.value=snapshot.val().expiredate;
        discription.value=snapshot.val().discription;
        msgfromauthor.value=snapshot.val().msgfromauth;
        imageurl.value=snapshot.val().imageurl;
      }
    });
  }