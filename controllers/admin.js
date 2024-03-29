const product = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    product.save()
    .then(() => {
      console.log('product created');
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if (!editMode) {
    res.redirect('/');
    return;
  }

  Product.findById( prodId )
    // Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        res.redirect('/');
        return;
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
}



exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteOne({_id: productId})
    .then(() => {
      console.log('PRODUCT DESTROYED');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.updateOne({_id: prodId}, {$set: {
    title: updatedTitle,
    price: updatedPrice,
    imageUrl: updatedImageUrl,
    description: updatedDescription
  }})
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res, next) => {
  // req.user
  //   .getProducts()
  Product.find()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};
