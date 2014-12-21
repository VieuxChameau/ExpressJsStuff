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

app.param('name', function(request, response, next){
	request.cityName = parseCityName(request.params.name);
	next();
});

// citites?search=Paradise
app.get('/cities', function(request, response){
	if (request.query.search) {
		response.send(citySearch(request.query.search));
	}
	response.send(cities);
});

app.get('/cities/:name', function (request, response) {
	var cityInfo = cities[request.cityName];
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
	for (var city in cities) {
		if (city == keyword) {
			return cities[keyword];
		}
	}
	return null;
}

function parseCityName(name){
	return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

app.listen(3001, function () {
	console.log("Running Express");
});