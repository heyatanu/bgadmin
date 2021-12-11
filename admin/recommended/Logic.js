db.collection('RECOMMENDED').get().then((snapshot) => {
	let html = ``;
	for (let i = 0; i < snapshot.size; i++) {
		let forupdate = "./updateanddelete/?id=" + snapshot.docs[i].id;
		html += `
        <tr>
        <td>` + (i + 1) + `</td>
        <td>` + snapshot.docs[i].id + `</td>
        <td>` + snapshot.docs[i].data().title + `</td>
        <td><a target="_blank" href="` + snapshot.docs[i].data().imagelink + `">IMAGE URL</a></td>
        <td><a target="_blank" href="` + snapshot.docs[i].data().rediractlink + `">` + snapshot.docs[i].data().rediractlink + `</a></td>
        <td><a target="_blank" href="` + forupdate + `">UPDATE OR DELETE</a></td>
      </tr>
        `;
	}
	document.getElementById("tabbody").innerHTML = html;
});


firebase.database().ref('recommendedupdates/').once('value', function(snapshot) {
	let html = ``;
	snapshot.forEach(function(childSnapshot) {


		html += `
		<tr>
        <td>` + childSnapshot.val().adminid + `</td>
        <td>` + childSnapshot.val().adminname + `</td>
					<td>` + childSnapshot.val().posttitle + `</td>
					<td>` + childSnapshot.val().status + `</td>
					<td>` + childSnapshot.val().time + `</td>
				  </tr>
		`;



	});
	if (html == ``) {
		html += `
  <tr>
        <td>NO DATA FOUND</td>
        <td>NO DATA FOUND</td>
        <td>NO DATA FOUND</td>
        <td>NO DATA FOUND</td>
        <td>NO DATA FOUND</td>
        </tr>
  `;
	}
	document.getElementById("recommendedtabbo").innerHTML = html;

});