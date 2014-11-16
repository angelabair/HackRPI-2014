var url = 'https://blooming-cliffs-6326.herokuapp.com';

function signUp() {
	var username = document.getElementById("username");
	var password = document.getElementById("password");
	var confirm_password = document.getElementById("confirm_password");

	if (password !== confirm_password) {
		alert("Password #1 and password #2 must match!");
	}

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