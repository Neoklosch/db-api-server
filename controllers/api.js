/**
 * Split into declaration and initialization for better performance.
 */
var validator,
    lob,
    ig,
    Y,
    request,

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
