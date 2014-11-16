var text = '{ "menuitem": [{"value": "New", "onclick": "CreateNewDoc()"},{"value": "Open", "onclick": "OpenDoc()"},{"value": "Close", "onclick": "CloseDoc()"} ]}';

var weather = '{ "currently": [{"time": 1416095514, "summary": "Partly Cloudy", "temperature": 62.2, "precipProbability": 0}]}';

function dostuff() {
    var jswag = JSON.parse(weather);
    document.write("Current time: " + jswag.currently[0].time + "<br>Weather: " + jswag.currently[0].summary + "<br>Temperature: " + 
		   jswag.currently[0].temperature + "<br>Chance of Rain: " + jswag.currently[0].precipProbability + "%");
}