var _ = require('lodash'),
    async = require('async'),
    Station = require('../models/Station'),
    secrets = require('../config/secrets'),
    csv = require('csv-parser'),
    fs = require('fs');

/**
 * GET /import/parseStationCsv
 * Parse stations from csv file
 */
exports.parseStationCsv = function(req, res) {
    fs.createReadStream('data/DBSuS-Uebersicht_Bahnhoefe-Stand2015-10.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new Station({
                bfNr: data['Bf. Nr.'],
                bundesland: data.Bundesland,
                bm: data.BM,
                station: data.Station,
                bfDsAbk: data['Bf\nDS 100\nAbk.'],
                katVst: data['Kat.\nVst'],
                strasse: data['Straße'],
                plz: data.PLZ,
                ort: data.Ort,
                aufgabentraeger: data['Aufgabenträger'],
                verkehrsVerb: data['Ver-\nkehrs-\nverb.'],
                fernverkehr: data['Fern-\nverkehr'],
                nahverkehr: data['Nah-\nverkehr']
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};
