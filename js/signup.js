var url = 'https://blooming-cliffs-6326.herokuapp.com';

function signUp() {
	if (document.getElementById("matching").value === "true") {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		alert("Username: " + username + "\npassword: " + password);
		$.post(url+'/newUser', {
			username: username, 
			password: password
		})
		.done(function(res) {
			alert("Success Message: " + res.message);
		})
		.fail(function(jqXHR, textStatus, errorThrown ) {
			alert("Error thrown: " + errorThrown + "; Text status: " + textStatus);
		});
	}
}