var mongoose = require('mongoose');

var stationSchema = new mongoose.Schema({
    bf-nr: {
        type: Number,
        unique: true
    },
    bundesland:String,
    bm: String,
    station: Number,
    bf-ds-abk: Integer,
    kat-vst: {},
    strasse: String,
    plz: {
        type: Number,
        max: 5
    },
    ort: String,
    aufgabentraeger: String,
    verkehrs-verb: String,
    fernverkehr: Boolean,
    nahverkehr: Boolean
});

module.exports = mongoose.model('Station', stationSchema);
