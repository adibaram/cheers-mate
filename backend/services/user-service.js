const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = 'user';

function checkLogin({ nickname, password }) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).findOne({ nickname }))
        .then(user => {
            if (user.password === password) return user;
            else throw new Error('password does not match');
        })
}

function getById(id) {
    var _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).findOne({ _id }))
        .then(user => {
            delete user.password;
            return user;
        }
        )
}

function query(userCheers) {
    if (!(userCheers && userCheers.length)) return Promise.resolve([])

    var filter = {
        $or: userCheers.map(userCheer => {
            let _id = new ObjectId(userCheer.userId);
            return { _id };
        })
    }
    console.log('DEBUG::filter', filter);
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).find(filter).toArray())
        .then(users => {
            users.forEach(user => {
                delete user.password;
            })
            return users;
        })
}

// todo  - add user only if nickname is not taken
function add(user) {
    return mongoService.connect()
        .then(db => db.collection(COLLECTION_NAME).insertOne(user))
}

function remove(userId) {
    userId = new ObjectId(userId)
    return mongoService.connect()
        .then(dbConn => {
            const userCollection = dbConn.collection(COLLECTION_NAME);
            return userCollection.remove({ _id: userId })
        })
}







module.exports = {
    query,
    getById,
    add,
    remove,
    checkLogin
}