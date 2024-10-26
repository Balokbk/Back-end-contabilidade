'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Account, {
        foreignKey: 'account_id'
      })
    }
  }
  User.init({
    user_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail:{
          args: true,
          msg: 'Formato de Email Inválido'
        }
      }
    },
    password_hash: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  });
  return User;
};