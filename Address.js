//var Address = document.getElementById('location').value;
var Lati = "";
var Longi = "";

function getLatiLong() {
	var geocoder = new google.maps.Geocoder();
   	var address = document.getElementById('location').value;

   	if (geocoder) {
      	geocoder.geocode({ 'address': address }, function (results, status) {
         	if (status == google.maps.GeocoderStatus.OK) {
            	//console.log(results[0].geometry.location);
            	var result = results[0].geometry.location;
            	Lati = "" + result.k;
            	Lati = Lati.substring(0,9);
            	Longi = "" + result.B;
            	Longi = Longi.substring(0,9);
            	getWeather(Lati, Longi);
         	}
         	else {
            	console.log("Geocoding failed: " + status);
         	}
      	});
   	} 
   	else {
   		document.write("Invalid script. Ya dun goof'd");
   	}  
}

function getWeather(Latias, Latios){
	var URL = "http://api.openweathermap.org/data/2.5/weather?lat=" + Latias + "&lon=" + Latios + "139&APPID=35e9b3fc58da0908910ee74db4a29357";
    //console.log(URL);
	$.getJSON(URL, function(data, status) {	    
	    getPreferences(data, processWeather);
   });
}

function processWeather(data, pref) {
    /*var pref = {
        heattolerance:-1, 
        coldtolerance:1 
    }*/
    //pref = JSON.parse(pref);
    //var pref = getPreferences();
    var heat = pref.heatTolerance;
    var cold = pref.chillTolerance;
    var location = data.name;
    var temp = (data.main.temp - 273.15)*1.8 + 32;
    var calctemp = temp;
    
   if (temp >= 73) {
	 if (heat == -2)
	    calctemp += 10;
	else if (heat == 2)
	    calctemp -= 10;
  else if (heat == -1)
      calctemp += 5;
  else if (heat == 1)
      calctemp -= 5;
    }

    else {
	if (cold == -2)
	    calctemp -= 10;
	else if (cold == 2)
	    calctemp += 10;
  else if (cold == -1)
      calctemp -= 5;
  else if (cold == 1)
      calctemp += 5;
  }
    temp = Math.round(temp*100)/100;
    console.log("Location: " + location);
    document.getElementById('location_field').innerHTML = 'Location: ' + location;
    console.log("Temperature: " + temp);
    document.getElementById('temp').innerHTML = 'Temperature: ' + temp;
    console.log("Weather Conditions: ");
    document.getElementById('conditions').innerHTML = 'Weather Conditions:';
    var num = data.weather.length;
    for (i = 0; i < data.weather.length; i++) {
	    console.log(data.weather[i].main); 
        document.getElementById('conditions').appendChild(document.createElement("br"));
        var newElement = document.createElement("span");
        newElement.innerHTML = data.weather[i].main;
        document.getElementById('conditions').appendChild(newElement);
    }
    //console.log("Adjusted Temp: " + calctemp);

    var result;
    console.log(calctemp);
    if (calctemp <= 30)
	   result = "It's cold. You'll need a heavy coat.";
    else if (calctemp <= 50)
	   result = "It's pretty cold. You'll need a jacket.";
    else if (calctemp <= 65)
	   result = "It's chilly. You'll need a sweater or a hoodie.";
    else if (calctemp <= 72)
	   result = "It's pleasant. You'll need a shirt.";
    else if (calctemp <= 90)
	   result = "It's hot. You'll want just a t-shirt.";
    else 
	   result = "It's very hot. You'll want a tank top.";

    if (calctemp <= 40)
      result += "<br>You might consider a scarf and gloves.";

    if (calctemp <= 0)
      result += "<br> It is extremely cold, consider not going out.";

    if (calctemp >= 75)
      result += "<br>You might consider wearing shorts instead of pants.";

    document.getElementById('result').innerHTML = result;
}

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    } 
    return query_string;
  } ();

function getPreferences(weatherData, callback) {
    var server_url = "https://blooming-cliffs-6326.herokuapp.com/"
    var username = QueryString.username;

    var data = {
        username: username
    }

    $.post(server_url+'getUserPreferences', data)
    .done(function(res) {
        //console.log(res);
      var status = res.status;
      if (res.status === 'success') {
        //console.log(res.user.preferences);
        callback(weatherData, res.user.preferences);
      }
      else {
        alert(res.message);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("Text: " + textStatus + "\nthrown: " + errorThrown);
    });
}