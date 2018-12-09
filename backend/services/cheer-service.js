const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const COLLECTION_NAME = 'cheer';
// GET ALL
function query(filter) {
    return mongoService.connect()
        .then(dbConn => {
            // SET FILTERS
            var filterObj = {}
            if (filter) {
                const byNameRegex = new RegExp(filter.locationName, 'i');
                filterObj = {
                    'locationName': byNameRegex,
                };
                if (+filter.fromDate) {
                    filterObj.date += {
                        $gt: +filter.fromDate * 1000,
                        $lt: +filter.toDate * 1000
                    }
                }
                sorter = {
                    [filter.sortBy]: 1
                };
            }
            console.log('DEBUG::filterObj', filterObj);


            const cheerCollection = dbConn.collection(COLLECTION_NAME);
            if (filter && filter.sortBy) return cheerCollection.find(filterObj).sort(sorter).toArray();
            return cheerCollection.find(filterObj).toArray()

        })
}
function getCheersForUser(userCheers) {
    if (!userCheers || !userCheers.length) return Promise.resolve([])
    let filter = {
        $or: userCheers.map(userCheer => {
            let _id = new ObjectId(userCheer.cheerId);
            return { _id }
        })
    }
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.find(filter).toArray()
        })
}
// GET FROM RADIUS
function queryRadius(params) {
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
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('cheer');
            collection.createIndex({ 'position': "2dsphere" });
            return collection.find(locationFilter).toArray();
        })
}
// GET SPECIFIC CHEER
function getById(_id) {
    _id = new ObjectId(_id);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.findOne({ _id });
        });
}
// REMOVE CHEER
function remove(_id) {
    _id = new ObjectId(_id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.remove({ _id })
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
function update(_id, newData) {
    _id = new ObjectId(_id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(COLLECTION_NAME);
            return collection.updateOne({ _id }, newData)
                .then(res => {
                    return res.modifiedCount;
                })
        })
}

module.exports = {
    query,
    queryRadius,
    getCheersForUser,
    remove,
    getById,
    add,
    update
}
