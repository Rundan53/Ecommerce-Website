const {ObjectId} = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, imageUrl, description, id){
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = new ObjectId(id);
  }

  save(){
    const db = getDb()
    if(this._id){
      return db.collection('products').updateOne({_id: this._id}, {$set: this});
    }

    return db.collection('products').insertOne(this)
    .then((result)=>{
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  static async getProducts(){
    const db = getDb();
    const products = await db.collection('products').find().toArray();
    console.log(`---------${products}`)
    return products;
  }

  static async findProduct(prodId){
    const db = getDb();
    const id = new ObjectId(prodId)
    const product = await db.collection('products').findOne({_id: id});
    return product;
  }

  static async deleteProduct(prodId){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(prodId)})
  }

}

module.exports = Product;