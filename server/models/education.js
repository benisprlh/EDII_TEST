'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Biodata)
    }
  }
  Education.init({
    level: DataTypes.STRING,
    name: DataTypes.STRING,
    major: DataTypes.STRING,
    graduateDate: DataTypes.DATE,
    ipk: DataTypes.INTEGER,
    biodataId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};