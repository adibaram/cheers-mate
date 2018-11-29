const mongoService = require('./mongo-service') 

const ObjectId = require('mongodb').ObjectId;

// GET ALL
function query(filter) {
    for (key in filter) {
        filter[key] = {$regex:  new RegExp(filter[key].toLowerCase(), "i")}
    }
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
            return collection.find(filter).toArray()
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
            const collection = db.collection('cheer');
            return collection.findOne({ _id: cheerId })
        })
}
// REMOVE CHEER
function remove(cheerId) {
    cheerId = new ObjectId(cheerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
            return collection.remove({ _id: cheerId })
        })
}
// ADD CHEER
function add(cheer) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
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
            const collection = db.collection('cheer');
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
