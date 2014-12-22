var express = require('express');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

// In memory store for the
// cities in our application
var cities = {
	'Lotopia': 'Rough and mountainous',
	'Caspiana': 'Sky-top island',
	'Indigo': 'Vibrant and thriving',
	'Paradise': 'Lush, green plantation',
	'Flotilla': 'Bustling urban oasis'
};

var router = express.Router();

router.route('/')
	.get(function (request, response) {
		if (request.query.search) {
			response.json(citySearch(request.query.search));
		} else {
			response.json(cities);
		}
	})
	.post(parseUrlencoded, function (request, response) {
		if (request.body.description.length > 4) {
			var city = createCity(request.body.name, request.body.description);
			response.status(201).json(city);
		} else {
			response.status(400).json('Invalid City');
		}
	});

router.route('/:name')
	.all(function (request, response, next) {
		request.cityName = parseCityName(request.params.name);
		next();
	})
	.get(function (request, response) {
		var cityInfo = cities[request.cityName];
		if (cityInfo) {
			response.json(cityInfo);
		} else {
			response.status(404).json("City not found");
		}
	})
	.delete(function (request, response) {
		if (cities[request.cityName]) {
			delete cities[request.cityName];
			response.sendStatus(200);
		} else {
			response.sendStatus(404);
		}
	});

var createCity = function (name, description) {
	cities[name] = description;
	return name;
};

function citySearch(keyword) {
	for (var city in cities) {
		if (city == keyword) {
			return cities[keyword];
		}
	}
	return null;
}

function parseCityName(name) {
	return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

module.exports = router;
