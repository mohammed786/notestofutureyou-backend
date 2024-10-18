// models/Relationship.js
const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig');
const User = require('./User');

const Relationship = sequelize.define('Relationship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  relationshipType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'relationships',
});

// Define associations (user has many relationships)
User.hasMany(Relationship, { foreignKey: 'user_id' });
User.hasMany(Relationship, { foreignKey: 'target_user_id' });

module.exports = Relationship;
