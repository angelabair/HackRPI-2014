//var url = 'https://blooming-cliffs-6326.herokuapp.com';
var url = 'https://blooming-cliffs-6326.herokuapp.com/';

function signUp() {
	if (document.getElementById("matching").value === "true") {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var data = {
			username: username,
			password: password
		};
		//alert(data);
		//alert("Username: " + username + "\npassword: " + password);
		$.post(url+'newUser', data)
		.done(function(res) {
			if (res.status === 'success')
				window.location.replace("preferences.html");
			else
				alert(res.message);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert("Text: " + textStatus + "\nthrown: " + errorThrown);
		});
	}
}

function success(data) {
	alert("Success!");
}

function error(jq, textStatus, errorThrown) {
	alert("Text status: " + textStatus + "\nerrot thrown: " + errorThrown);
}