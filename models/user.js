const {ObjectId} = require('mongodb')
let getDb = require('../util/database').getDb;

class User{
    constructor(name, email){
        this.name = name;
        this.email = email
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    static async findById(id){
       try{
        const db = getDb();
        const user = await db.collection('users').findOne({_id: new ObjectId(id)});
        return user;
       }
       catch(err){
        console.log(err)
       }
    }
}

module.exports = User;