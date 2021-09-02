var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");

let title=document.getElementById("title");
let imglink=document.getElementById("imglink");
let reditactlink=document.getElementById("reditactlink");
let discription=document.getElementById("discription");
let status=document.getElementById("status");
db.collection('RECOMMENDED').doc(id).get().then((snapshot) => {
    status.innerHTML="UPDATE OR DELETE THE VALUES"
    if(snapshot.data()!=null){
        title.value=snapshot.data().title;
        imglink.value=snapshot.data().imagelink;
        reditactlink.value=snapshot.data().rediractlink;
        discription.value=snapshot.data().dis;
    }
    else{
        status.innerHTML="PROBLEM WITH ID"
    }
});


document.getElementById("update").onclick = function() {
    status.innerHTML="Wait";
    db.collection('admin').get().then((snapshot) => {
        for (let i=0;i<snapshot.size;i++){
        let pas= (snapshot.docs[i].data().pass)
            if(pas==document.getElementById("adminid").value){
                db.collection('RECOMMENDED').doc(id).update({
                    title:title.value,
                    imagelink:imglink.value,
                    rediractlink: reditactlink.value,
                    dis:discription.value
                });
                status.innerHTML="UPDATED"
                break
            }
            else{
                status.innerHTML="Check Admin ID"
            }
        }
    });
};



document.getElementById("delete").onclick = function() {
    status.innerHTML="Wait";
    let con=confirm("Are you sure to permanently delete this?");
    if(con){
        db.collection('admin').get().then((snapshot) => {
            for (let i=0;i<snapshot.size;i++){
            let pas= (snapshot.docs[i].data().pass)
                if(pas==document.getElementById("adminid").value){
                    db.collection('RECOMMENDED').doc(id).delete();
                    status.innerHTML="DELETED"
                    break
                }
                else{
                    status.innerHTML="Check Admin ID"
                }
            }
        });
    }
    else{
        status.innerHTML="Status";
    }
};
