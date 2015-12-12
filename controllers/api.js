/**
 * Split into declaration and initialization for better performance.
 */
var Station = require('../models/Station'),
    StationRni = require('../models/StationRni'),
    Platform = require('../models/Platform'),
    PlatformRni = require('../models/PlatformRni'),
    BlattspinatStation = require('../models/BlattspinatStation'),
    BlattspinatStationNodes = require('../models/BlattspinatStationNodes'),
    _ = require('lodash'),
    async = require('async'),
    querystring = require('querystring'),
    secrets = require('../config/secrets'),
    request = require('request'),
    curl = require('curlrequest');

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function(req, res) {
    res.render('api/index', {
        title: 'API Examples'
    });
};

/**
 * GET /station
 * List of all stations.
 */
exports.getStation = function(req, res) {
    Station.find(lowerCaseParameters(req.query), function(err, stations){
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

exports.getStationRni = function(req, res) {
    StationRni.find(lowerCaseParameters(req.query), function(err, stations){
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

/**
 * GET /station
 * List of all stations.
 */
exports.getPlatform = function(req, res) {
    Platform.find(lowerCaseParameters(req.query), function(err, platform){
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(platform));
    });
};

exports.getPlatformRni = function(req, res) {
    PlatformRni.find(lowerCaseParameters(req.query), function(err, platform){
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(platform));
    });
};

exports.getBlattspinatStation = function(req, res) {
    BlattspinatStation.find(lowerCaseParameters(req.query), function(err, stations){
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

exports.getBlattspinatStationByLatLon = function(req, res) {
    if (!req.params.hasOwnProperty('lat') || !req.params.hasOwnProperty('lon')) {
        res.sendStatus(400).end();
        return;
    }
    var coords = [req.params.lon, req.params.lat],
        distance = req.query.hasOwnProperty('distance') ? req.query.distance : 5;
        distance /= 6371;
    BlattspinatStation.find({
        loc: {
            $near: coords,
            $maxDistance: distance
        }
    }, function(err, stations){
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

exports.getBlattspinatStationNodes = function(req, res) {
    BlattspinatStationNodes.find(lowerCaseParameters(req.query), function(err, stations){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

exports.getParkingCities = function(req, res) {
    request('http://opendata.workonweb.de/api/beta/cities', function (error, response, body) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getParkingStations = function(req, res) {
    var getParams = '';
    if (req.query !== {}) {
        getParams = '?' + querystring.stringify(req.query);
    }
    request('http://opendata.workonweb.de/api/beta/stations' + getParams, function (error, response, body) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getParkingOccupancy = function(req, res) {
    request('http://opendata.workonweb.de/api/beta/occupancy', function (error, response, body) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getParkingOccupancyParam = function(req, res) {
    request('http://opendata.workonweb.de/api/beta/occupancy/' + req.param('siteid'), function (error, response, body) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getElevatorFacilities = function(req, res) {
    curl.request({
        url: 'http://adam.noncd.db.de/api/v1.0/facilities/'
    }, function(err, stdout, meta) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
    });
};

exports.getElevatorFacilitiesParam = function(req, res) {
    curl.request({
        url: 'http://adam.noncd.db.de/api/v1.0/facilities/' + req.params.equipmentnumber
    }, function(err, stdout, meta) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
    });
};

exports.getElevatorStationsParam = function(req, res) {
    curl.request({
        url: 'http://adam.noncd.db.de/api/v1.0/stations/' + req.params.stationnumber
    }, function(err, stdout, meta) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
    });
};

function lowerCaseParameters(param) {
    var searchParam = {};
    for (var element in param) {
        if (param[element] % 1 === 0) {
            searchParam[element] = param[element];
        } else {
            searchParam[element] = {
                $regex : new RegExp(param[element], "gi")
            };
        }
    }
    return searchParam;
}
