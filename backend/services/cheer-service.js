const mongoService = require('./mongo-service') 

const ObjectId = require('mongodb').ObjectId;


function query(filter) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
            return collection.find(filter).toArray()
        })
}

function remove(cheerId) {
    cheerId = new ObjectId(cheerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
            return collection.remove({ _id: cheerId })
        })
}
function getById(cheerId) {
    cheerId = new ObjectId(cheerId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
            return collection.findOne({ _id: cheerId })
        })
}

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
    remove,
    getById,
    add,
    update
}
