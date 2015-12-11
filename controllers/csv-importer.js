var _ = require('lodash'),
    async = require('async'),
    Station = require('../models/Station'),
    StationRni = require('../models/StationRni'),
    BlattspinatStation = require('../models/BlattspinatStation'),
    BlattspinatStationNodes = require('../models/BlattspinatStationNodes'),
    Platform = require('../models/Platform'),
    PlatformRni = require('../models/PlatformRni'),
    secrets = require('../config/secrets'),
    csv = require('csv-parser'),
    fs = require('fs');

/**
 * GET /import/parseStation
 * Parse stations from csv file
 */
exports.parseStation = function(req, res) {
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

exports.parseStationRni = function(req, res) {
    fs.createReadStream('data/DBRNI-Uebersicht_Bahnhoefe-Stand2015-10.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new StationRni({
                bfNr: data['Bf. Nr.'],
                bundesland: data.Bundesland,
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

exports.parsePlatform = function(req, res) {
    fs.createReadStream('data/DBSuS-Bahnsteigdaten-Stand2015-10.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new Platform({
                bfNr: data['bf_nr'],
                bahnsteig: data['bahnsteig'],
                bahnsteigkanteBwAufBs: data['bahnsteigkante_bw_auf_bs'],
                oertlicheBezeichnung: data['örtliche_bezeichnung'],
                nettobaulaengenM: data['nettobaulängen_m'],
                hoeheBahnsteigkanteCm: data['höhe_bahnsteigkante_cm']
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};

exports.parsePlatformRni = function(req, res) {
    fs.createReadStream('data/DBRNI-Bahnsteigdaten-Stand2015-10.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new PlatformRni({
                bfNr: data['bf_nr'],
                bahnsteigNr: data['Bahnsteig_Nr'],
                bahnsteigHoeheCm: data['Bahnsteig_Hoehe_cm'],
                nettobahnsteiglaengeM: data['Nettobahnsteiglaenge_m']
            });

            station.save(function(err) {
                if (err) console.error(err);
            });
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};

/**
 * GET /import/parseBlattspinatStation
 * Parse blattspinat stations from csv file
 */
exports.parseBlattspinatStation = function(req, res) {
    fs.createReadStream('data/blattspinat/stations_with_coordinates_v1.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new BlattspinatStation({
                bahnhofNr: data['BahnhofNr'],
                bundesland: data['Bundesland'],
                bahnhofsmanagement: data['Bahnhofsmanagement'],
                station: data['Station'],
                ds100: data['DS100'],
                bahnhofskategorie: data['Bahnhofskategorie'],
                strasse: data['Strasse'],
                plz: data['PLZ'],
                ort: data['Ort'],
                aufgabentraeger: data['Aufgabenträger'],
                verkehrsVerb: data['Verkehrsverb'],
                fernverkehr: data['Fernverkehr'],
                nahverkehr: data['Nahverkehr'],
                lat: data['lat'],
                lon: data['lon'],
                loc: [data['lon'], data['lat']]
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};

/**
 * GET /import/parseBlattspinatStationNodes
 * Parse blattspinat stations nodes from csv file
 */
exports.parseBlattspinatStationNodes = function(req, res) {
    fs.createReadStream('data/blattspinat/BahnhoefeNeu.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new BlattspinatStationNodes({
                bahnhofsId: data['BahnhofsId'],
                bahnhofname: data['Bahnhofname'],
                position: data['Position'],
                latitude: data['Latitude'],
                longitude: data['Longitude']
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};
