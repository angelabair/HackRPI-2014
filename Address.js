var Address = "Hong Kong, China";
var tempAddress = Address.split(" ");
var Lati = "";
var Longi = "";

function getLatiLong() {
	var geocoder = new google.maps.Geocoder();
   	var address = Address;

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
	    processWeather(data);
   });
}

function processWeather(data) {
    var pref = '{"user": { "username":"danharel", "preferences":[{"heattolerance":-1}, {"coldtolerance":1 }]}}'
    pref = JSON.parse(pref);
    var heat = pref.user.preferences[0].heattolerance;
    var cold = pref.user.preferences[1].coldtolerance;
    var location = data.name;
    var temp = (data.main.temp - 273.15)*1.8 + 32;
    var calctemp = temp;
    if (temp >= 73) {
	if (heat === -1)
	    calctemp += 10;
	else if (heat === 1)
	    calctemp -= 10;
    }
    else {
	if (cold === -1)
	    calctemp -= 10;
	else if (cold === 1)
	    calctemp += 10;
    }
    temp = Math.round(temp*100)/100;
    console.log("Location: " + location);
    console.log("Temperature: " + temp);
    console.log("Weather Conditions: ");
    var num = data.weather.length;
    for (i = 0; i < data.weather.length; i++) {
	console.log(data.weather[i].main);
    }
    //console.log("Adjusted Temp: " + calctemp);

    if (calctemp <= 30)
	console.log("It's cold. You'll need a heavy coat.");
    else if (calctemp <= 50)
	console.log("It's pretty cold. You'll need a jacket.");
    else if (calctemp <= 65)
	console.log("It's chilly. You'll need a sweater or a hoodie.");
    else if (calctemp <= 72)
	console.log("It's pleasant. You'll need a shirt.");
    else if (calctemp <= 90)
	console.log("It's hot. You'll want just a t-shirt.");
    else 
	console.log("It's very hot. You'll want a tank top.");
}
