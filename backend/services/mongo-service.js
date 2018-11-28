var dbConn = null;
const url = 'mongodb://cheers:Cheers123@ds119024.mlab.com:19024/cheer_db';

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    const url = (!process.env.PORT)? 
                    'mongodb://localhost:27017/cheer_db' : 'mongodb://cheers:Cheers123@ds119024.mlab.com:19024/cheer_db'
    
    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB');
            
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
