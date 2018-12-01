const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = 'cheer';


function getByUser(userId) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).find({userId}))
}
function getByCheer(cheerId) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).find({cheerId}))
}
function add(rsvp) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).insertOne(rsvp))
        .then(res=> {
            console.log('rsvp added successfully');
        })
}
function remove(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(dbConn => {
            const userCollection = dbConn.collection(COLLECTION_NAME);
            return userCollection.remove({ _id })
        })
}

module.exports = {
    getByUser,
    getByCheer,
    add,
    remove
}