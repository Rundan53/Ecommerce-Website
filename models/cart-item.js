const sequelize = require('../util/database');

const Sequelize = require('sequelize');

const CartItem = sequelize.define('cartItems',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    quantity: Sequelize.INTEGER
});


module.exports = CartItem;