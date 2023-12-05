let db = require('../util/database')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  static deleteById(prodId) {
    return db.execute('DELETE FROM products WHERE id = ?',[prodId]);
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES(?, ?, ?, ?)',
    [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
   return db.execute(`SELECT * FROM products WHERE id = ?`,[id]);
  }



};
