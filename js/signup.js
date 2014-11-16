var url = 'https://blooming-cliffs-6326.herokuapp.com';

function signUp() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	$.post(url+'/addUser', {
		username: username, 
		password: password
	})
	.done(function(res) {
		alert(res.message);
	})
	.fail(function(jqXHR, textStatus, errorThrown ) {
		alert(textStatus);
	});
}