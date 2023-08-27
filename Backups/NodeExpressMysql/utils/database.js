const Sequelize = require('sequelize');

const sequelize =  new Sequelize('nodejslearn', 'root', 'sriram', {
    dialect: 'mysql', 
    host: 'localhost',
});

module.exports = sequelize;