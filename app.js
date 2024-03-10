const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use((req, res, next)=> {
//     User.findById('65ed7b30f9bd9257ba2bccda')
//     .then((user)=>{
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//     })
//     .catch((err)=> console.log(err));
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const username = encodeURIComponent("rundanwnr");
const password = encodeURIComponent("Rundan@99");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.taxt5br.mongodb.net/shop?retryWrites=true`)
.then(()=>{
    console.log('connected')
    app.listen(3000);
})
.catch((err)=> console.log(err))




