const fs = require('fs');
const path = require('path');


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  static deleteById(prodId) {
    getProductsFromFile((products)=> {
      const productIndex = products.findIndex((p)=> p.id==prodId);
      const updatedProducts = products.filter((pr,index)=> index!==productIndex);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
    })

  }

  save() {
    if (this.id) {
      getProductsFromFile((products) => {
        const existingProductIndex = products.findIndex(
        (p) => p.id == this.id
        );
        products[existingProductIndex] = this;
        const updatedProducts = [...products]
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      });
      return;
    }

    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find(p => {
        if (p.id == id) {
          return p;
        }
      })
      cb(product)
    })
  }



};
