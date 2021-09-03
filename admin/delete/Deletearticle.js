
var url_string = window.location.href
var url = new URL(url_string);
var upid = url.searchParams.get("id");
document.getElementById("mainid").value=upid;


  document.getElementById("getvalue").onclick = function() {
    const d = new Date();
let timeanddate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes();
let timeanddateforid = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes();


db.collection('admin').get().then((snapshot) => {
  for (let i=0;i<snapshot.size;i++){
    let pas= (snapshot.docs[i].data().pass)
    let adminname= (snapshot.docs[i].data().name)
    let adminid= (snapshot.docs[i].data().adminid)
    if(pas==document.getElementById("adminid").value){
      var mainid=document.getElementById("mainid").value;
      mainid=mainid.trim();
      document.getElementById("mainsts").innerHTML="Wait for a sec";
      firebase.database().ref('session/' + mainid).on('value',function(snapshot){
        if(snapshot.val()==null){
          document.getElementById("mainsts").innerHTML="Article deleted";
        }
        else{
          document.getElementById("mainsts").innerHTML="ID found. Article deleted";
          setTimeout(function(){
            firebase.database().ref('session/' + mainid).remove();
          },3000);
          firebase.database().ref('updates/' + (adminid+"||DEL||"+timeanddateforid)).set({
            adminid:adminid,
            name:adminname,
            articldid:mainid,
            status:"DELETE",
            time:timeanddate
        });
        }
      });
      break
    }
    else{
      document.getElementById("mainsts").innerHTML="Check Admin ID";
    }
  }
}).catch(err => {
  // console.log("ERROR");
});

  }


  