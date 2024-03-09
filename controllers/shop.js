const Product = require('../models/product');
const User = require('../models/user')
exports.getProducts = (req, res, next) => {
  Product.getProducts()
  .then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  .catch((err)=> console.log(err));
}

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId

  // req.user.getProducts({where: {id: prodID}})
  Product.findProduct(prodID)
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
  Product.getProducts()
  .then((products)=> {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
};




exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then((products)=> {
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
console.log('inside postcart')
  Product.findProduct(prodId)
  .then((product)=>{
    console.log(`product = ${product}`)
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
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

