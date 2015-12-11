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
    secrets = require('../config/secrets');

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
