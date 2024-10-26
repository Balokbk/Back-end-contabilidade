'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Account, {
        foreignKey: 'account_id'
      })
    }
  }
  Transaction.init({
    transaction_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.ENUM('income', 'expense'),
    amount: DataTypes.DECIMAL(15,2),
    description: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: false,
  });
  return Transaction;
};