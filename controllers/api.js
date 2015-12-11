/**
 * Split into declaration and initialization for better performance.
 */
var Station = require('../models/Station'),
    Platform = require('../models/Platform'),
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
    Station.find(req.query, function(err, stations){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

/**
 * GET /station
 * List of all stations.
 */
exports.getPlatform = function(req, res) {
    Platform.find(req.query, function(err, platform){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(platform));
    });
};

exports.getBlattspinatStation = function(req, res) {
    BlattspinatStation.find(req.query, function(err, stations){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

exports.getBlattspinatStationNodes = function(req, res) {
    BlattspinatStationNodes.find(req.query, function(err, stations){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};

exports.getParkingCities = function(req, res) {
    request('http://opendata.workonweb.de/api/beta/cities', function (error, response, body) {
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
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getParkingOccupancy = function(req, res) {
    request('http://opendata.workonweb.de/api/beta/occupancy', function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getParkingOccupancyParam = function(req, res) {
    request('http://opendata.workonweb.de/api/beta/occupancy/' + req.param('siteid'), function (error, response, body) {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    })
};

exports.getElevatorFacilities = function(req, res) {
    curl.request({
        url: 'http://adam.noncd.db.de/api/v1.0/facilities/'
    }, function(err, stdout, meta) {
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
    });
};

exports.getElevatorFacilitiesParam = function(req, res) {
    curl.request({
        url: 'http://adam.noncd.db.de/api/v1.0/facilities/' + req.params.equipmentnumber
    }, function(err, stdout, meta) {
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
    });
};

exports.getElevatorStationsParam = function(req, res) {
    curl.request({
        url: 'http://adam.noncd.db.de/api/v1.0/stations/' + req.params.stationnumber
    }, function(err, stdout, meta) {
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
    });
};
