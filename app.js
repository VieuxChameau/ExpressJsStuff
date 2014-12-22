var express = require('express');
var app = express();
var logger = require('./logger');
var bodyParser = require('body-parser');


var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Use of logger middleware
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


app.post('/cities', parseUrlencoded, function (request, response) {
	var description = request.body.description;
	if (description.length > 4){
		var city = createCity(request.body.name, description);
		response.status(201).json(city);
	} else {
		response.status(400).json('Invalid City');
	}
});

app.delete('/cities/:name', function (request, response){
	if (cities[request.cityName]){
		delete cities[request.cityName];
		response.sendStatus(200);
	} else {
		response.sendStatus(404);
	}
});

var createCity = function(name, description){
	cities[name] = description;
	return name;
};

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