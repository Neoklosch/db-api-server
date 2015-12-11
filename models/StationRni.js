var mongoose = require('mongoose');

var stationRniSchema = new mongoose.Schema({
    bfNr: {
        type: Number,
        unique: true
    },
    bundesland: String,
    station: String,
    bfDsAbk: String,
    katVst: Number,
    strasse: String,
    plz: {
        type: Number,
        max: 99999
    },
    ort: String,
    aufgabentraeger: String,
    verkehrsVerb: String,
    fernverkehr: Boolean,
    nahverkehr: Boolean
});

stationRniSchema.pre('save', function(next) {
    var station = this;

    if (station.fernverkehr === 'ja') {
        station.fernverkehr = true;
    } else if (station.fernverkehr === 'nein') {
        station.fernverkehr = false;
    }
    if (station.nahverkehr === 'ja') {
        station.fernverkehr = true;
    } else {
        station.fernverkehr = false;
    }

    next();
});

module.exports = mongoose.model('StationRni', stationRniSchema);
