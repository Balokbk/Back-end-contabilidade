'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete:'CASCADE'
      })
      Account.hasMany(models.Transaction, {
        foreignKey: 'transaction_id'
      })
    }
  }
  Account.init({
    account_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    balance: DataTypes.DECIMAL(15,2),
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: false,
  });
  return Account;
};