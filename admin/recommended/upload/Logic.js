let status=document.getElementById("status");
let adminid=document.getElementById("adminid");
let title=document.getElementById("title");
let imageurllink=document.getElementById("imageurllink");
let rediractlink=document.getElementById("rediractlink");
let discription=document.getElementById("discription");
let databasename='RECOMMENDED';






document.getElementById("upload").onclick = function() {
    status.innerHTML="Uploading..";
    db.collection('admin').get().then((snapshot) => {
        for (let i=0;i<snapshot.size;i++){
          let pas= (snapshot.docs[i].data().pass)
          if(pas==document.getElementById("adminid").value){
            const data ={
                dis : discription.value,
                imagelink:imageurllink.value,
                rediractlink:rediractlink.value,
                title:title.value
            };
            db.collection(databasename).add(data).then(()=>{
                status.innerHTML="Uploaded";

            }).catch((err)=>{
                status.innerHTML="Error Occers";
            });
            
          }
          else{
            status.innerHTML="Check The Admin ID";
          }
        }
    });
}