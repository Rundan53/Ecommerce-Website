const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Product = require('./product')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref:'Product', required: true },
            quantity: { type: Number, required: true }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    console.log(product._id)
    const productIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() == product._id.toString();
    })

    let userCartItems = this.cart.items;
    let newQuantity = 1;
    console.log(productIndex)
    if (productIndex >= 0) {
        newQuantity = this.cart.items[productIndex].quantity + 1;
        userCartItems[productIndex].quantity = newQuantity;
    }
    else {
        userCartItems.push({ productId: product._id, quantity: 1 });
    }

    const updatedCart = { items: userCartItems };
    this.cart = updatedCart;
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart.items = [];
    return this.save();
}

// userSchema.methods.getOrder = function (){
//     return Order.find({'user.id': new ObjectId(this._id)})
// }


userSchema.methods.deleteProductFromCart = function (productId){
    const updatedCart = this.cart.items.filter(p=>{
        return  p.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCart;
    return this.save()
}


// class User{
//     constructor(name, email, cart, id){
//         this.name = name;
//         this.email = email;
//         this.cart = cart;
//         this._id = id
//     }

//     save(){
//         const db = getDb();
//         return db.collection('users').insertOne(this)
//         .then((result)=>{
//             console.log(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }

//     static async findById(id){
//        try{
//         const db = getDb();
//         const user = await db.collection('users').findOne({_id: new ObjectId(id)});
//         return user;
//        }
//        catch(err){
//         console.log(err)
//        }
//     }

//     getCart(){
//         const db = getDb();
//         const productIds = this.cart.items.map((el)=> el.productId);
//         return db.collection('products').find({_id: {$in: productIds}}).toArray()
//         .then((products)=>{
//             return products.map(p=> {
//                 return {
//                     ...p, quantity: this.cart.items.find(i=>{
//                     return i.productId.toString()== p._id.toString();
//                 }).quantity}
//             })
//         })

//     }


//     addToCart(product){
//         const db = getDb();
//         const productIndex = this.cart.items.findIndex((cp)=>{
//             return cp.productId.toString() == product._id.toString();
//         })

//         let userCartItems = this.cart.items;
//         let newQuantity = 1;
//         console.log(productIndex)
//         if(productIndex >=0){
//             newQuantity = this.cart.items[productIndex].quantity + 1;
//             userCartItems[productIndex].quantity = newQuantity;
//         }
//         else{
//             userCartItems.push({productId: product._id, quantity: 1});
//         }

//         const updatedCart = {items: userCartItems}
//         return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
//     }


   

//     addOrder(){
//         const db = getDb();
//         return this.getCart()
//         .then((products)=>{
//             const order = {
//                 items: products,
//                 user: {
//                     id: new ObjectId(this._id),
//                     name: this.name
//                 }
//             }
//             return db.collection('orders').insertOne(order)
//         })
//         .then((result)=>{
//             this.cart = {items: []};
//             return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {items: []}}})
//         })
//         .catch(err=> console.log(err));
//     }

//     getOrder(){
//         const db = getDb();
//         return db.collection('orders').find({'user.id': new ObjectId(this._id)}).toArray()
//     }
// }

module.exports = mongoose.model('User', userSchema);