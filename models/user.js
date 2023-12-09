let Sequelize = require('sequelize');

let sequelize = require('../util/database');

let User = sequelize.define('customers', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    username: Sequelize.STRING,

    email: Sequelize.STRING,
})


module.exports = User;