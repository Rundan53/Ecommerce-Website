const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const username = encodeURIComponent("rundanwnr");
const password = encodeURIComponent("Rundan@99");

let db;
const mongoConnect = (cb)=>{
    MongoClient.connect(`mongodb+srv://${username}:${password}@cluster0.taxt5br.mongodb.net/shop?retryWrites=true`)
    .then((client)=>{
        console.log('connected');
        db = client.db();
        cb()
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getDb = ()=>{
    if(db){
        return db;
    }
    throw "No database found"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;