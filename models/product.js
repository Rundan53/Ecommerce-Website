const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('products',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  title: Sequelize.STRING,

  price:{
    type: Sequelize.DOUBLE,
    allowNull: false,
  },

  imageUrl:{
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})


module.exports = Product;