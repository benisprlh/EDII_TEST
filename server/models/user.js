'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Biodata, {foreignKey: 'userId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        notEmpty: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Email must have @',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: 8,
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Password is required',
        },
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: "user"
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};