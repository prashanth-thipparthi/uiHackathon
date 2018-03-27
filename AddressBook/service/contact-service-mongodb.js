// contact-service-mongodb.js
let mongoclient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;

const URL = 'mongodb://localhost'; // port defaults to 27017
const dbname = 'mfdb';
const collectionName = "contacts_"

function checkForCallback(callback) {
    if (!callback || typeof callback != 'function') {
        throw new Error('callback was not supplied as a function');
    }
}

class ContactServiceMongodb {
    addNew(contact, callback) {
        checkForCallback(callback);

        if (!contact || typeof contact != 'object') {
            var err = {};
            err.code = 1001;
            err.message = 'No contact was supplied or contact was non-object';
            setTimeout(() => { callback(err); }, 0) // no second argument
            return;
        }

        var requiredFields = ['firstname', 'lastname', 'email', 'phone', 'gender'];
        var missingFields = [];
        for (var i = 0; i < requiredFields.length; i++) {
            var fld = requiredFields[i];
            if (!(fld in contact)) {
                missingFields.push(fld);
            }
        }

        if (missingFields.length > 0) {
            var err = {};
            err.code = 1002;
            err.message = 'Missing fields: ' + missingFields.join();
            setTimeout(() => { callback(err); }, 0) // no second argument
            return;
        }

        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err);
                return;
            }

            let db = client.db(dbname);
            let contacts = db.collection(collectionName);
            contacts.insertOne(contact, (err, status) => {
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

    getById(id, callback) {
        checkForCallback(callback);

        if (!id || typeof id != 'string') {
            let err = { code: 1003, message: 'id must be string' };
            setTimeout(() => { callback(err); }, 0);
            return;
        }
        try {
            id = new ObjectId(id);
        }
        catch (e) {
            let err = { code: 1004, message: 'id must be 24 character hex string' };
            setTimeout(() => { callback(err); }, 0);
            return;
        }
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let contacts = db.collection(collectionName);
            contacts.findOne({ _id: id }, (err, data) => {
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

    getAll(callback) {
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let contacts = db.collection(collectionName);
            contacts.find().toArray((err, data) => {
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

    getAllByName(name, callback) {
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let contacts = db.collection(collectionName);
            let query = RegExp(name, "i");
            console.log("query is: ", query);
            contacts.find({firstname : query}).toArray((err, data) => {
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

    update(contact, callback) {
        checkForCallback(callback);

        if (!contact || typeof contact != 'object') {
            var err = {};
            err.code = 1001;
            err.message = 'No contact was supplied or contact was non-object';
            setTimeout(() => { callback(err); }, 0) // no second argument
            return;
        }

        var requiredFields = ['_id', 'firstname', 'lastname', 'email', 'phone', 'gender'];
        var missingFields = [];
        for (var i = 0; i < requiredFields.length; i++) {
            var fld = requiredFields[i];
            if (!(fld in contact)) {
                missingFields.push(fld);
            }
        }

        if (missingFields.length > 0) {
            var err = {};
            err.code = 1002;
            err.message = 'Missing fields: ' + missingFields.join();
            setTimeout(() => { callback(err); }, 0) // no second argument
            return;
        }

        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err);
                return;
            }

            let db = client.db(dbname);
            let contacts = db.collection(collectionName);
            contacts.updateOne({_id: contact._id}, contact, (err, status) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(undefined, status);
                }
                client.close();
            });
        });
    }

    delete(id, callback) {
        checkForCallback(callback);

        if (!id || typeof id != 'string') {
            let err = { code: 1003, message: 'id must be string' };
            setTimeout(() => { callback(err); }, 0);
            return;
        }
        try {
            id = new ObjectId(id);
        }
        catch (e) {
            let err = { code: 1004, message: 'id must be 24 character hex string' };
            setTimeout(() => { callback(err); }, 0);
            return;
        }
        mongoclient.connect(URL, (err, client) => {
            if (err) {
                callback(err); return;
            }
            let db = client.db(dbname);
            let contacts = db.collection(collectionName);
            contacts.deleteOne({ _id: id }, (err, data) => {
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

module.exports = ContactServiceMongodb;
