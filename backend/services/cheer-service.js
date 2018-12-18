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
    
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    const urls = [

        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545150100/bars/image_resize.php.jpg"
        },
    
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545150077/bars/Lobster-Bar-and-Grill-SMALL.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545150052/bars/Trader.png"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545150029/bars/1491581507196.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149927/bars/13f65701725eac0c1e452a2416caf13a732f6be8.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149858/bars/15271610985b06a10ac49b5132187.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149812/bars/toma_bar_tel_aviv_20_3.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149765/bars/1018316866.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149732/bars/Beautiful-people-beautiful-views-at-Sublet1-462x346.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149876/bars/image.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149328/bars/gn-gift_guide_variable_c.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149320/bars/tmg-article_default_mobile.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149256/bars/Sugar-East-Miami-Hotel-0001.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149250/bars/Alfresco64-057.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149245/bars/10-of-the-Most-Beautiful-Hotel-Bars-nashville-jackson-720x720-slideshow.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149241/bars/Paradiso.png"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149238/bars/The-most-beautiful-rooftop-bars-in-the-world-mumbais-four-seasons-hotel.png"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149236/bars/LA-Wildcraft-Italian-Interior-Bar.jpg"
        },
        {
            "url": "https://res.cloudinary.com/cheers-mate/image/upload/v1545149235/bars/merchant-and-trade-most-beautiful-bars-and-restaurants.jpg"
        }
    ];
    
    return urls[getRandomIntInclusive(0, urls.length-1)].url;
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
