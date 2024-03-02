'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Training.belongsTo(models.Biodata, {foreignKey: 'biodataId'})
    }
  }
  Training.init({
    name: DataTypes.STRING,
    certificate: DataTypes.STRING,
    period: DataTypes.DATE,
    biodataId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Training',
  });
  return Training;
};