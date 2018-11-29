const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = 'cheer';

// GET ALL
function query(filter) {
    /*
        for (key in filter) {
            filter[key] = {$regex:  new RegExp(filter[key].toLowerCase(), "i")}
        }
        return mongoService.connect()
            .then(db => {
                const collection = db.collection('cheer');
                return collection.find(filter).toArray()
            })
    */
//    console.log(filter)
    return mongoService.connect()
    .then(dbConn => {
        // SET FILTERS
        const byNameRegex = new RegExp(filter.locationName, 'i');
        let filterObj = {
            'locationName': byNameRegex,
        };

        if (+filter.fromDate) {
            filterObj.date = {
                $gt: +filter.fromDate*1000,
                $lt: +filter.toDate*1000
            }
            console.log('DEBUG::filterObj', filterObj);
        }

        const cheerCollection = dbConn.collection(COLLECTION_NAME);
        if (filter.sortBy) return cheerCollection.find(filterObj).sort({ [filter.sortBy]: 1 }).toArray();
        return cheerCollection.find(filterObj).toArray()

    })
}
// GET FROM RADIUS
function queryRadius(params) {
    console.log('DEBUG::params', params);
    const locationFilter = {
        position: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [+params.lat, +params.lng]
                },
                $maxDistance: +params.radius
            }
        }
    }
    console.log('DEBUG::locationFilter', locationFilter);
    return mongoService.connect()
    .then(db => {
        const collection = db.collection('cheer');
        collection.createIndex({ 'position': "2dsphere" });
        return collection.find(locationFilter).toArray();
    })
}
// GET SPECIFIC CHEER
function getById(cheerId) {
    cheerId = new ObjectId(cheerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.findOne({ _id: cheerId })
        })
}
// REMOVE CHEER
function remove(cheerId) {
    cheerId = new ObjectId(cheerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.remove({ _id: cheerId })
        })
}
// ADD CHEER
function add(cheer) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.insertOne(cheer)
                .then(result => {
                    cheer._id = result.insertedId;
                    return cheer;
                })
        })
}
// UPDATE CHEER
function update(cheer) {
    cheer._id = new ObjectId(cheer._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.updateOne({ _id: cheer._id }, { $set: cheer })
                .then(result => {
                    return cheer;
                })
        })
}

module.exports = {
    query,
    queryRadius,
    remove,
    getById,
    add,
    update
}
