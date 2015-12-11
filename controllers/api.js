/**
 * Split into declaration and initialization for better performance.
 */
var Station = require('../models/Station'),
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
    Station.find({}, function(err, stations){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stations));
    });
};
