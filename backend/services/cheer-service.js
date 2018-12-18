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
async function add(cheer) {
    try {
        const imgUrl = await _getCheerImg(cheer.img);
        console.log('DEBUG:_getCheerImg:imgUrl', imgUrl);

        if (imgUrl) cheer.img = imgUrl;
        else throw new Error('imgUrl is undefined');
        console.log('DEBUG::addCheerTry',cheer.img);
    } catch(err) {
        cheer.img = _getRandomImg();
        console.log('DEBUG::addCheerCatch', cheer.img);
    }
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

function test() {
    console.log('DEBUG::foo');
}

async function _getCheerImg(locationName) {
    console.log('DEBUG:_getCheerImg:locationName', locationName);
    const nodeFetch = require('node-fetch');
    const q = encodeURIComponent(locationName);
    return await nodeFetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${q}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0`)
        .then(res => res.json())
        .then(place => {
            console.log('DEBUG:_getCheerImg:place', place);
            return nodeFetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.candidates[0].photos[0].photo_reference}&key=AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0`)
                    .then(res =>res.url)
        });
}

function _getRandomImg() {
    return 'https://moneycrashers-sparkchargemedia.netdna-ssl.com/wp-content/uploads/2017/08/bachelor-party-bar-drinks-1024x576.jpg'
}
  

module.exports = {
    query,
    queryRadius,
    getCheersForUser,
    remove,
    getById,
    add,
    update,
    test
}
