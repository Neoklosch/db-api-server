/**
 * Module dependencies.
 */
var express = require('express');
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    lusca = require('lusca'),
    methodOverride = require('method-override'),
    _ = require('lodash'),
    MongoStore = require('connect-mongo')(session),
    flash = require('express-flash'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    sass = require('node-sass-middleware'),

    /**
     * Controllers (route handlers).
     */
    homeController = require('./controllers/home'),
    userController = require('./controllers/user'),
    apiController = require('./controllers/api'),
    contactController = require('./controllers/contact'),
    csvParserController = require('./controllers/csv-importer'),

    /**
     * API keys and Passport configuration.
     */
    secrets = require('./config/secrets'),
    passportConf = require('./config/passport'),

    /**
     * Create Express server.
     */
    app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'expanded'
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    store: new MongoStore({
        url: secrets.db,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    xssProtection: true
}));
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(function(req, res, next) {
    if (/api/i.test(req.path)) req.session.returnTo = req.path;
    next();
});
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));


/**
 * Primary app routes.
 */
app.get('/', apiController.getApi);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

app.get('/parse/station', passportConf.isAuthenticated, csvParserController.parseStation);
app.get('/parse/station-rni', passportConf.isAuthenticated, csvParserController.parseStationRni);
app.get('/parse/platform', passportConf.isAuthenticated, csvParserController.parsePlatform);
app.get('/parse/platform-rni', passportConf.isAuthenticated, csvParserController.parsePlatformRni);
app.get('/parse/blattspinat/station', passportConf.isAuthenticated, csvParserController.parseBlattspinatStation);
app.get('/parse/blattspinat/station-nodes', passportConf.isAuthenticated, csvParserController.parseBlattspinatStationNodes);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/station', apiController.getStation);
app.get('/api/platform', apiController.getPlatform);

app.get('/api/station-rni', apiController.getStationRni);
app.get('/api/platform-rni', apiController.getPlatformRni);

app.get('/api/blattspinat/station', apiController.getBlattspinatStation);
app.get('/api/blattspinat/station/:lat/:lon', apiController.getBlattspinatStationByLatLon);
app.get('/api/blattspinat/station-nodes', apiController.getBlattspinatStationNodes);

app.get('/api/parking/cities', apiController.getParkingCities);
app.get('/api/parking/stations', apiController.getParkingStations);
app.get('/api/parking/occupancy', apiController.getParkingOccupancy);
app.get('/api/parking/occupancy/:siteid', apiController.getParkingOccupancyParam);

app.get('/api/elevator/facilities', apiController.getElevatorFacilities);
app.get('/api/elevator/facilities/:equipmentnumber', apiController.getElevatorFacilitiesParam);
app.get('/api/elevator/stations/:stationnumber', apiController.getElevatorStationsParam);



/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
