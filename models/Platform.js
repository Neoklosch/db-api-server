var mongoose = require('mongoose');

var platformSchema = new mongoose.Schema({
    bfNr: {
        type: Number,
        unique: true
    },
    bahnsteig: String,
    bahnsteigkanteBwAufBs: String,
    oertlicheBezeichnung: String,
    nettobaulaengenM: Number,
    hoeheBahnsteigkanteCm: Number
});

module.exports = mongoose.model('Platform', platformSchema);
