var mongoose = require('mongoose');

var blattspinatStationNodesSchema = new mongoose.Schema({
    bahnhofsId: {
        type: String,
        unique: true
    },
    bahnhofname: String,
    position: String,
    latitude: String,
    longitude: String
});

blattspinatStationNodesSchema.pre('save', function(next) {
    var station = this;

    station.bahnhofname = station.bahnhofname.trim();

    next();
});

module.exports = mongoose.model('BlattspinatStationNodes', blattspinatStationNodesSchema);
