var _ = require('lodash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    OAuthStrategy = require('passport-oauth').OAuthStrategy,
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy,

    secrets = require('./secrets'),
    User = require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    email = email.toLowerCase();
    User.findOne({
        email: email
    }, function(err, user) {
        if (!user) return done(null, false, {
            message: 'Email ' + email + ' not found'
        });
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid email or password.'
                });
            }
        });
    });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
    var provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, {
            kind: provider
        })) {
        next();
    } else {
        res.redirect('/auth/' + provider);
    }
};
