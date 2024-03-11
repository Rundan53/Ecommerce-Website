const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order')
exports.getProducts = (req, res, next) => {
  Product.find()
  .then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  .catch((err)=> console.log(err));
}

exports.getProduct = (req, res) => {
  const prodID = req.params.productId

  // req.user.getProducts({where: {id: prodID}})
  Product.findById(prodID)
  .then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
  .catch(err=> console.log(err));

}

exports.getIndex = (req, res, next) => {
  // req.user.
  // getProducts()
  Product.find()
  .then((products)=> {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
};

exports.createOrder = (req, res)=>{
  req.user.populate('cart.items.productId')
  .then((user)=>{
    const products = user.cart.items.map((i)=>{
      return {product: {...i.productId._doc}, quantity: i.quantity}
    })

    const order = new Order({
      products: products,
      user:{
        name: req.user.name,
        userId: req.user._id
      }
    })
    return order.save();
  })
  .then(()=> req.user.clearCart())
  .then(()=> res.redirect('/order'))
  .catch(err=> console.log(err))
}



exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
  .then((user)=> {
    const products = user.cart.items
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })
  .catch(err=> console.log(err))
 
}




exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
  .then((product)=>{
    return req.user.addToCart(product)
  })
  .then((result)=>{
    console.log(result);
    res.redirect('/cart');
  })
  .catch(err=>console.log(err))
}


exports.postCartDeleteProduct = (req,res,next)=> {
  const prodID = req.body.productId;
  req.user.deleteProductFromCart(prodID)
  .then((result)=> {
    res.redirect('/cart')
  })
  .catch(err=> console.log(err));
  
}



exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user._id})
  .then((orders)=>{
    console.log(orders)
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
 
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

