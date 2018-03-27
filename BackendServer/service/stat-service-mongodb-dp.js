// stat-service-mongodb.js
let mongoclient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;

const URL = 'mongodb://localhost'; // port defaults to 27017
const dbname = 'mfdb';
const collectionName = "statistics_dp"

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
            stats.insertOne(stat, (err, status) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(undefined, { _id: status.insertedId });
                }
                client.close();
            });
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

    
}

module.exports = StatServiceMongodb;
