var Address = "1600 Amphitheatre Parkway, Mountain View, CA";
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
};

function getWeather(Latias, Latios){
	var URL = "https://api.forecast.io/forecast/c2bf890c3c1be1255709cab189655227/" + Latias + "," + Latios;
	console.log(URL);
}
