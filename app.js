const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next)=> {
    User.findById('65ede625095448f6264e3393')
    .then((user)=>{
        req.user = user;
        next();
    })
    .catch((err)=> console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



const username = encodeURIComponent("rundanwnr");
const password = encodeURIComponent("Rundan@99");

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.taxt5br.mongodb.net/shop?retryWrites=true`)
.then(()=>{
    console.log('connected');
    return User.findOne()
})
.then((user)=>{
    if(!user){
        const user = new User({
            name: 'Rundan Onkar',
            email: 'rundan.onkar@gmail.com',
            cart: {
              items: []
            }  
          });
          user.save()
    }

    app.listen(3000);
})
.catch((err)=> console.log(err))




