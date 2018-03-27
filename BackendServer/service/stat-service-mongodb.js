// stat-service-mongodb.js
let mongoclient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;

const URL = 'mongodb://localhost'; // port defaults to 27017
const dbname = 'mfdb';
const collectionName = "statistics_ab"

function checkForCallback(callback) {
    if (!callback || typeof callback != 'function') {
        throw new Error('callback was not supplied as a function');
    }
}

class StatServiceMongodb {
    addNew(stat, callback) {
        checkForCallback(callback);

        if (!stat || typeof stat != 'object') {
            var err = {};
            err.code = 1001;
            err.message = 'No stat was supplied or stat was non-object';
            setTimeout(() => { callback(err); }, 0) // no second argument
            return;
        }

        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err);
                return;
            }

            let db = client.db(dbname);
            let stats = db.collection(collectionName);
            
            if (stat.action == "click")
            {
                stats.findOneAndUpdate({ date: stat.date, widget: stat.widget }, {$inc: {click: 1/3}, $setOnInsert: stat}, {upsert : true}, (err, status) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(undefined, { _id: status.insertedId });
                    }
                    client.close();
                });
            }
            else
            {
                stats.findOneAndUpdate({ date: stat.date, widget: stat.widget }, {$inc: {activesecs: 1/3}, $setOnInsert: stat}, {upsert : true}, (err, status) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(undefined, { _id: status.insertedId });
                    }
                    client.close();
                });
            }
        });
    }

    getAll(callback) {
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let stats = db.collection(collectionName);
            stats.find().toArray((err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(undefined, data);
                }
                client.close();
            });
        });
    }

    getAllByWidgetGroup(callback) {
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let stats = db.collection(collectionName);
            stats.aggregate([{ $group: { _id : "$widget", clicks : { $sum : "$click"}, active_secs : { $sum : "$activesecs"}}}]).toArray((err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(undefined, data);
                }
                client.close();
            });
        });
    }

    getWidgetStats(widget, callback) {
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let stats = db.collection(collectionName);
            stats.aggregate([{ $group: { _id : "$widget", clicks : { $sum : "$click"}, active_secs : { $sum : "$activesecs"}}}]).toArray((err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(undefined, data);
                }
                client.close();
            });
        });
    }

    
}

module.exports = StatServiceMongodb;
