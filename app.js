var express = require('express');
var app = express();
var logger = require('./logger');

app.use(express.static('public'));

app.use(logger);

var cities = {
	'Lotopia': 'Rough and mountainous',
	'Caspiana': 'Sky-top island',
	'Indigo': 'Vibrant and thriving',
	'Paradise': 'Lush, green plantation',
	'Flotilla': 'Bustling urban oasis'
};

// citites?search=Paradise
app.get('/cities', function(request, response){
	if (request.query.search) {
		response.send(citySearch(request.query.search));
	}
	response.send(cities);
});

app.get('/cities/:name', function (request, response) {
	var cityInfo = cities[request.params.name];
	if (cityInfo){
		response.json(cityInfo);
	} else {
		response.status(404).json("City not found");
	}
});

app.get('/locations', function (request, response) {
	response.redirect(301, '/cities');
});

function citySearch (keyword) {
	var regexp = RegExp(keyword, 'i');
	return cities.filter(function (city) {
		return city.match(regexp);
	});
}

app.listen(3001, function () {
	console.log("Running Express");
});