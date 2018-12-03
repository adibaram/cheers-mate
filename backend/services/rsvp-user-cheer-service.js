const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = 'rsvp-user-cheer';

function query() {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).find({}).toArray())
}

function getByUser(userId) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).find({userId}).toArray())
        .catch(err => console.log('DEBUG:rsvp service getByUser :err', err))
}
function getByCheer(cheerId) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).find({cheerId}).toArray())
        .catch(err=> console.log('DEBUG:rsvp service:err',err))
}
function add(rsvp) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).insertOne(rsvp))
        .then(res=> {
            console.log('rsvp added successfully');
        })
}
function remove(filter) {
    return mongoService.connect()
        .then(db => {
            return db.collection(COLLECTION_NAME).remove(filter)
        })
}

module.exports = {
    query,
    getByUser,
    getByCheer,
    add,
    remove
}