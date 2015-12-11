var mongoose = require('mongoose');

var platformRniSchema = new mongoose.Schema({
    bfNr: {
        type: Number,
        unique: true
    },
    bahnsteigNr: String,
    bahnsteigHoeheCm: String,
    nettobahnsteiglaengeM: String
});

module.exports = mongoose.model('PlatformRni', platformRniSchema);
