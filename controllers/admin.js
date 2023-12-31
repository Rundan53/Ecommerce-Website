const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    // Product.create()
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err))

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if (!editMode) {
    res.redirect('/');
    return;
  }

  req.user.getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then((products) => {
      if (!products) {
        res.redirect('/');
        return;
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products[0]
      });
    })
    .catch(err => console.log(err));
}



exports.postDeleteProduct = (req, res, next) => {
  const proId = req.body.productId;
  Product.findByPk(proId)
    .then((product) => {
      return product.destroy();
    })
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

  Product.update({ title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDescription },
    { where: { id: prodId } })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    // Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};
