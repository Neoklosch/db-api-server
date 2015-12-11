var mongoose = require('mongoose');

var blattspinatStationSchema = new mongoose.Schema({
    bahnhofNr: {
        type: Number,
        unique: true
    },
    bundesland:String,
    bahnhofsmanagement: String,
    station: String,
    ds100: String,
    bahnhofskategorie: Number,
    strasse: String,
    plz: {
        type: Number,
        max: 99999
    },
    ort: String,
    aufgabentraeger: String,
    verkehrsVerb: String,
    fernverkehr: Boolean,
    nahverkehr: Boolean,
    lat: String,
    lon: String,
    loc: {
        type: [Number],
        index: '2d'
    }
});

blattspinatStationSchema.pre('save', function(next) {
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

module.exports = mongoose.model('BlattspinatStation', blattspinatStationSchema);
