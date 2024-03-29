'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Work.belongsTo(models.Biodata, {foreignKey: 'biodataId'})
    }
  }
  Work.init({
    name: DataTypes.STRING,
    lastPosition: DataTypes.STRING,
    lastSalary: DataTypes.INTEGER,
    period: DataTypes.DATE,
    biodataId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Work',
  });
  return Work;
};