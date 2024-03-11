const Product = require('../models/product');
const User = require('../models/user')
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
  req.user.addOrder()
  .then(()=> res.redirect('/order'))
  .catch(err=> console.log(err))
}



exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
  .then((user)=> {
    console.log('prodcuts',user.cart.items);
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
    console.log(result)
    res.redirect('/cart')
  })
  .catch(err=> console.log(err));
  
}



exports.getOrders = (req, res, next) => {
  req.user.getOrder()
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

